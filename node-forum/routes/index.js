/**
 * Created by Uncle Liu on 2017/12/25.
 */
const express = require('express')
const User = require('../models/user')
const Topic = require('../models/topic')
const Board = require('../models/board')
const { log } = require('../utils')
const { currentUser } = require('./main')

const index = express.Router()

index.get('/', (request, response) => {
    const userList = User.all()
    const u = currentUser(request)
    const board_id = Number(request.query.board_id || -1)
    let ms = Topic.allList(board_id)
    const topicsWithNoReply = Topic.topicsWithNoReply()
    const boards = Board.all()
    const args = {
        users: userList,
        user: u,
        topics: ms,
        boards: boards,
        board_id: board_id,
        topicsWithNoReply: topicsWithNoReply,
    }    
    // console.log('debug u and args', u, args)
    // response.render('index/index.html', args)
    response.render('index/new_index.html', args)
})

index.get('/login', (request, response) => {
    const args = {
        next_url: request.query.next_url || ''
    }
    response.render('index/login.html', args)
})

index.post('/login', (request, response) => {
    const form = request.body
    const u = User.findOne('username', form.username)
    if (u.validateAuth(form)) {
        request.session.uid = u.id
        const nextUrl = form.next_url || '/'
        response.redirect(nextUrl)
    }
})

index.get('/register', (request, response) => {
    response.render('index/register.html')
})

index.post('/register', (request, response) => {
    const form = request.body
    const u = User.create(form)
    response.redirect('/')
})

// 注销，清空 session
index.get('/logout', (request, response) => {
    request.session = null
    response.redirect('/')
})

module.exports = index
