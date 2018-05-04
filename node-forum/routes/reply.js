/**
 * Created by Uncle Liu on 2017/12/26.
 */
const express = require('express')
const Reply = require('../models/reply')
const Model = Reply
const { log } = require('../utils')
const { currentUser, loginRequired, adminRequired } = require('./main')
//
const reply = express.Router()
//
reply.post('/add', loginRequired, (request, response) => {
    const form = request.body
    const u = currentUser(request)
    console.log('debug form', form)
    const kwargs = {
        user_id: u.id,
    }
    const m = Reply.create(form, kwargs)
    response.redirect(`/topic/detail/${m.topic_id}`)
})

module.exports = reply