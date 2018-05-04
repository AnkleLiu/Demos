/**
 * Created by Uncle Liu on 2017/12/28.
 */
const express = require('express')
const Topic = require('../models/topic')
const Model = Topic
const { log } = require('../utils')
const { jsonResponse } = require('./main')
//
const router = express.Router()
//
router.post('/login', (request, response) => {
    const form = request.body
    const obj = Model.fakeCreate(form)
    jsonResponse(request, response, obj)
})

router.get('/all', (request, response) => {
    const ms = Model.all()
    // log('debug ms', request.headers)
    const dict = {
        success: true,
        data: ms,
        message: '',
    }
    jsonResponse(request, response, dict)
})

router.get('/detail/:id', (request, response) => {
    const id = Number(request.params.id)
    const m = Model.get(id)
    const dict = {
        success: true,
        data: m,
        message: '',
    }
    jsonResponse(request, response, dict)
})

router.post('/add', (request, response) => {
    const form = request.body
    console.log('debug body', form)
    const m = Model.create(form)
    const dict = {
        success: true,
        data: m,
        message: '',
    }
    jsonResponse(request, response, dict)
})

module.exports = router