/**
 * Created by Uncle Liu on 2017/12/26.
 */
const express = require('express')
const Topic = require('../models/topic')
const Board = require('../models/board')
const Model = Topic
const { log } = require('../utils')
const { currentUser, loginRequired } = require('./main')
//
const topic = express.Router()
//
topic.get('/', (request, response) => {
    const board_id = Number(request.query.board_id || -1)
    let ms = Topic.allList(board_id)
    const boards = Board.all()
    const args = {
        topics: ms,
        boards: boards,
        board_id: board_id,
    }
    // log('debug args', args)
    response.render('topic/index.html', args)
})

topic.get('/detail/:id', loginRequired, (request, response) => {
    const id = Number(request.params.id)
    const m = Topic.get(id)
    const args = {
        topic: m,
    }
    response.render('topic/detail.html', args)
})

topic.get('/new', (request, response) => {
    const boards = Board.all()
    const args = {
        boards: boards,
    }
    response.render('topic/new.html', args)
})

topic.post('/add', (request, response) => {
    const form = request.body
    const u = currentUser(request)
    form.user_id = u.id
    const m = Model.create(form)
    response.redirect('/topic')
})

topic.get('/delete/:id', loginRequired, (request, response) => {
    const id = Number(request.params.id)
    const t = Model.remove(id)
    response.redirect('/topic')
})

topic.get('/edit/:id', (request, response) => {
    const id = Number(request.params.id)
    const m = Model.get(id)
    const args = {
        topic: m,
    }
    response.render('topic/edit.html', args)
})

module.exports = topic
