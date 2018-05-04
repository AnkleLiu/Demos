/**
 * Created by Uncle Liu on 2017/12/25.
 */
const User = require('../models/user')
const { log } = require('../utils')

// 获取当前用户
const currentUser = (request) => {
    // 根据 session 里的 uid 获取，没有就是 ''
    const uid = request.session.uid || ''
    const u = User.findOne('id', uid)
    if (u === null) {
        // 如果当前没有用户登陆，就伪造一个
        const fakeUser = {
            id: -1,
            username: '游客',
            isAdmin: function () {
                return false
            }
        }
        return fakeUser
    } else {
        return u
    }
}

// 强制用户登陆
const loginRequired = (request, response, next) => {
    const u = currentUser(request)
    if (u.id === -1) {
        log('登陆检测：没有登陆', request.method)
        const baseUrl = '/login'
        if (request.method === 'GET') {
            const nextUrl = baseUrl + '?next_url=' + request.originalUrl
            response.redirect(nextUrl)
        } else {
            // const nextUrl = baseUrl + '?next_url=' + request.originalUrl
            response.redirect(baseUrl)
        }
    } else {
        log('登陆了什么也不做，继续下一个请求')
        next()
    }
}
// 要求管理员身份才能访问
const adminRequired = (request, response, next) => {
    const u = currentUser(request)
    if (u.isAdmin()) {
        next()
    } else {
        request.session.flash = {
            message: '只有管理员才能访问这个页面'
        }
        //
        const baseUrl = '/login'
        if (request.method === 'GET') {
            // 如果发送的是 GET，登录之后跳转到 next_url
            const nextUrl = baseUrl + '?next_url=' + request.originalUrl
            response.redirect(nextUrl)
        } else {
            // const nextUrl = baseUrl + '?next_url=' + request.originalUrl
            response.redirect(baseUrl)
        }
    }
}

module.exports = {
    currentUser: currentUser,
    loginRequired: loginRequired,
    adminRequired: adminRequired,
}