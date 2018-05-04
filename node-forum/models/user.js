/**
 * Created by Uncle Liu on 2017/12/25.
 */
// 用户
const Model = require('./main')
const crpyto = require('crypto')

class User extends Model {
    constructor(form={}) {
        super()
        this.id = form.id
        this.username = form.username || ''
        this.password = form.password || ''
        this.note = form.note || ''
        this.role = 2
        this.avatar = ''
    }
    // 创建一个用户，算出加密后的密码，
    // 然后交给父类的 create 方法
    static create(form={}) {
        form.password = this.saltedPassword(form.password)
        const u = super.create(form)
        u.save()
        return u
    }
    //
    static saltedPassword(password, salt='node8') {
        function _sha1(s) {
            const algorithm = 'sha1'
            const hash = crpyto.createHash(algorithm)
            hash.update(s)
            const h = hash.digest('hex')
            return h
        }
        const hash1 = _sha1(password)
        const hash2 = _sha1(hash1 + salt)
        return hash2
    }
    // 表单验证
    validateAuth(form) {
        // cls 指向了 User 类
        const cls = this.constructor
        const { username, password } = form
        const pwd = cls.saltedPassword(password)
        const usernameEquals = this.username === username
        const passwordEquals = this.password === pwd
        return usernameEquals && passwordEquals
    }
    // 登陆
    static login(form={}) {
        const { username, password } = form
        // 因为这里是 public 方法，所以 this 访问的是类
        const pwd = this.saltedPassword(password)
        const u = User.findOne('username', username)
        return u !== null && u.password === pwd
    }
    // 注册
    static register(form={}) {
        const { username, password } = form
        const validForm = username.length > 2 && password.length > 2
        const uniqueUser = User.findOne('username', username) === null
        if (validForm && uniqueUser) {
            const u = this.create(form)
            u.save()
            return u
        } else {
            return null
        }
    }
    // 是管理员吗
    isAdmin() {
        return this.id === 1
    }
}

module.exports = User

// const __main = () => {
//     console.log('__main')
//     const form = {
//         username: 'liu',
//         password: '123',
//         note: 'Javascript',
//     }
//     User.create(form)
//     const u = User.login(form)
//     console.log('debug u', u)
// }
//
// __main()