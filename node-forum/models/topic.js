/**
 * Created by Uncle Liu on 2017/12/26.
 */
const Model = require('./main')

class Topic extends Model {
    constructor(form={}) {
        super()
        this.id = form.id
        this.views = 0
        this.title = form.title || ''
        this.content = form.content || ''
        this.ct = Date.now()
        this.ut = this.ct
        this.user_id = form.user_id || ''
        this.board_id = Number(form.board_id || -1)
    }

    static get(id) {
        const m = super.get(id)
        m.views += 1
        m.save()
        return m
    }

    static fakeCreate(form) {
        const m = super.create(form)
        if (m === null) {
            const obj = {
                success: false,
                data: null,
                message: '用户名已经使用',
            }
            return obj
        } else {
            const obj = {
                success: true,
                data: m,
                message: '',
            }
            return obj
        }
    }
    // 根据 board_id 找到这个 board_id 对应的所有 topic
    static allList(board_id) {
        let ms = []
        if (board_id === -1) {
            ms = super.all()
        } else {
            ms = super.find('board_id', board_id)
        }
        return ms
    }
    // 根据 topic 找到 user
    user() {
        const User = require('./user')
        const u = User.findOne('id', this.user_id)
        return u
    }
    // 找到这个 topic 的所有的回复
    replies() {
        const Reply = require('./reply')
        const ms = Reply.find('topic_id', this.id)
        return ms
    }
    // 找到所有没有 reply 的 topic
    static topicsWithNoReply() {
        const r = []
        const topicList = this.all()
        topicList.forEach(t => {
            if (t.replies().length === 0) {
                r.push(t)
            }
        })
        return r
    }
    // 找到当前 topic 关联的板块
    board() {
        const Board = require('./board')
        const b = Board.findOne('id', this.board_id)
        return b
    }
}

// const __main = () => {
//     const topic_id = 5
//     const topic = Topic.get(5)
//     const replies = topic.replies()
//     console.log(replies)
//     Topic.topicsWithNoReply()
// }

// __main()

module.exports = Topic
