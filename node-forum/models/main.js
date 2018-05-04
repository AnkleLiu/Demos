/**
 * Created by Uncle Liu on 2017/12/25.
 */
// 把类里面常用的属性、方法抽象出来
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
// static 方法里面的 this 就是这个类自己
// static 方法里面的 this.name 就是类名字（比如 Model）
// 非 static 方法里面的 this 指的是调用这个方法的实例
// 实例的 constructor 属性指向的也是类，这样就可以调用类方法了
// 和 Function 构造函数的指向一样
class Model {
    // 取得 .txt 文件的绝对路径
    static dbPath() {
        const classname = this.name.toLowerCase()
        const path = require('path')
        const filename = `${classname}.txt`
        const p = path.join(__dirname, '../db', filename)
        return p
    }
    // 生成实例，create 方法的替代
    static _newFromDict(dict) {
        const cls = this
        const m = new cls({})
        Object.keys(dict).forEach((k) => {
            m[k] = dict[k]
        })
        return m
    }
    // 取得所有实例
    static all() {
        const path = this.dbPath()
        const models = load(path)
        const ms = models.map((m) => {
            const cls = this
            const instance = cls._newFromDict(m)
            return instance
        })
        return ms
    }
    //
    static create(form={}, kwargs={}) {
        const cls = this
        const instance = new cls(form)
        Object.keys(kwargs).forEach((k) => {
            instance[k] = kwargs[k]
        })
        instance.save()
        return instance
    }
    // 根据 key value 找到一个实例
    static findOne(key, value) {
        const all = this.all()
        let m = all.find((e) => {
            return e[key] === value
        })
        //
        if (m === undefined) {
            m = null
        }
        //
        return m
    }
    // 找到所有 key value 的实例
    static find(key, value) {
        const all = this.all()
        const models = all.filter((m) => {
            return m[key] === value
        })
        return models
    }
    // 根据 id 找到实例
    static get(id) {
        return this.findOne('id', id)
    }
    // 保存一个实例
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
            const index = models.findIndex((e) => {
                return e.id === this.id
            })
            if (index > -1) {
                models[index] = this
            }
        }
        const path = cls.dbPath()
        save(models, path)
    }
    // 根据 id 删除一个实例
    static remove(id) {
        const cls = this
        const models = cls.all()
        const index = models.findIndex((e) => {
            return e.id === id
        })
        if (index > -1) {
            models.splice(index, 1)
        }
        const path = cls.dbPath()
        save(models, path)
        return
    }
    // 查找页数
    static totalPages() {
        const all = this.all()
        return all.length
    }
    // 输出全靠吼
    // toString() {
    //     const s = JSON.stringify(this, null, 2)
    //     return s
    // }
    // 测试 this
    // testThis() {
    //     return this
    // }
}

module.exports = Model

// const __main = () => {
//     const s = new Model()
//     console.log('s.constructor:', s.constructor)
//     console.log('Model.constructor:', Model.constructor)
//     console.log('Model.name:', Model.name)
//     // console.log('Model.this:', Model.testThis())
//     // console.log('s.this:', s.testThis())
//     console.log('main')
// }
//
// __main()
