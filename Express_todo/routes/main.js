/**
 * Created by Uncle Liu on 2018/5/2.
 */
const User = require('../models/user')
const Todo = require('../models/todo')
const { log } = require('../utils')

const currentUser = (request) => {
    const fakeId = -1
    const uid = request.session.uid || fakeId
    const u = User.get(uid)
    if (u === null) {
        const fakeUser = {
            id: fakeId,
            username: '游客',
        }
        return fakeUser
    } else {
        return u
    }
}

const loginRequired = (request, response, next) => {
    const u = currentUser(request)
    if (u.id === -1) {
        log('登录检测: 没有登录', request.method)
        const baseUrl = '/login'
        if (request.method === 'GET') {
            const nextUrl = baseUrl + '?next_url=' + request.originalUrl
            response.redirect(nextUrl)
        } else {
            response.redirect(baseUrl)
        }
    } else {
        log('如果登录了就什么都不做, 继续下一个请求函数')
        next()
    }
}

module.exports = {
    currentUser: currentUser,
    loginRequired: loginRequired,
}