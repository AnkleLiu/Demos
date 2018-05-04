/**
 * Created by Uncle Liu on 2018/5/2.
 */
const Model = require('./main')

class Todo extends Model {
    constructor(form={}) {
        super()
        this.id = form.id
        this.title = form.title || ''
        this.completed = form.completed || false
        this.user_id = form.user_id
        const now = Date.now()
        this.ct = form.ct || now
        this.ut = form.ut || now
    }

    static update(form) {
        console.log('debug form', form)
        const id = Number(form.id)
        const t = this.get(id)
        t.title = form.title
        t.ut = Date.now()
        t.save()
        return t
    }

    static complete(id, completed) {
        const t = Todo.get(id)
        t.completed = completed
        t.save()
        return t
    }

    static todoPerPage(page=1) {
        return super.modelPerPage(page)
    }
}

module.exports = Todo