/**
 * Created by Uncle Liu on 2017/12/27.
 */
const express = require('express')
// multer 是上传文件的模块
const multer = require('multer')
const { uploadPath } = require('../config')
// 配置上传文件的路径
const upload = multer({
    dest: uploadPath,
})
const User = require('../models/user')
const { log } = require('../utils')
const { currentUser, loginRequired, adminRequired } = require('./main')

const main = express.Router()

main.get('/profile/:id', loginRequired, (request, response) => {
    const id = Number(request.params.id)
    const m = User.get(id)
    const args = {
        user: m,
    }
    response.render('user/profile.html', args)
})

main.post('/upload/avatar', loginRequired, upload.single('avatar'), (request, response) => {
    log('debug request file', request.file)
    const u = currentUser(request)
    const avatar = request.file
    u.avatar = avatar.filename
    u.save()
    log('debug u', u)
    response.redirect(`/user/profile/${u.id}`)
})

main.get('/avatar/:filename', (request, response) => {
    const path = require('path')
    const filename = request.params.filename
    const p = uploadPath + filename
    const absolutePath = path.resolve(p)
    response.sendFile(absolutePath)
})

module.exports = {
    user: main,
}