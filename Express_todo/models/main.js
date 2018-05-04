/**
 * Created by Uncle Liu on 2018/5/2.
 */
const fs = require('fs')

const ensureExists = (path) => {
    if (!fs.existsSync(path)) {
        const data = '[]'
        fs.writeFileSync(path, data)
    }
}

const save = (data, path) => {
    const s = JSON.stringify(data, null, 2)
    fs.writeFileSync(path, s)
}

const load = (path) => {
    const options = {
        encoding: 'utf8',
    }
    ensureExists(path)
    const s = fs.readFileSync(path, options)
    const data = JSON.parse(s)
    return data
}

class Model {
    static dbPath() {
        const classname = this.name.toLowerCase()
        const path = require('path')
        const filename = `${classname}.txt`
        const p = path.join(__dirname, '../db', filename)
        return p
    }

    static _newFromDict(dict) {
        const cls = this
        const m = new cls(dict)
        return m
    }

    static all() {
        const path = this.dbPath()
        const models = load(path)
        const ms = models.map(m => {
            return this._newFromDict(m)
        })
        return ms
    }

    static create(form={}, kwargs={}) {
        const cls = this
        const instance = new cls(form)
        Object.keys(kwargs).forEach(k => {
            instance[k] = kwargs[k]
        })
        instance.save()
        return instance
    }

    static findOne(key, value) {
        const all = this.all()
        let m = all.find(e => {
            return e[key] === value
        })
        if (m === undefined) {
            m = null
        }
        return m
    }

    static find(key, value) {
        const all = this.all()
        const models = all.filter(m => {
            return m[key] === value
        })
        return models
    }

    static get(id) {
        return this.findOne('id', id)
    }

    save() {
        const cls = this.constructor
        const models = cls.all()
        if (this.id === undefined) {
            if (models.length > 0) {
                const last = models[models.length - 1]
                this.id = last.id + 1
            } else {
                this.id = 1
            }
            models.push(this)
        } else {
            const index = models.findIndex(e => {
                return e.id === this.id
            })
            if (index > -1) {
                models[index] = this
            }
        }
        const path = cls.dbPath()
        save(models, path)
    }

    static remove(id) {
        const cls = this
        const models = cls.all()
        const index = models.findIndex(e => {
            return e.id === id
        })
        if (index > -1) {
            models.splice(index, 1)
        }
        const path = this.dbPath()
        save(models, path)
        return
    }

    static modelPerPage(page=1) {
        const modelList = this.all()
        const dataPerPage = 2
        const totalLength = modelList.length
        let startIndex = dataPerPage * page - 2
        if (dataPerPage * page > totalLength) {
            return modelList.slice(startIndex)
        } else {
            return modelList.splice(startIndex, 2)
        }
    }

    static totalPages() {
        const totalModelLength = this.all().length
        const dataPerPage = 2
        const r = totalModelLength % 2
        const len = r === 0 ? totalModelLength / 2 : parseInt(totalModelLength / 2 ) + 1
        const l = []
        for (let i = 1; i <= len; i++) {
            l.push(i)
        }
        return l
    }

    toString() {
        const s = JSON.stringify(this, null, 2)
        return s
    }
}

module.exports = Model