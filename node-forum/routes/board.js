/**
 * Created by Uncle Liu on 2017/12/26.
 */
const express = require('express')
const Board = require('../models/board')
const Model = Board
const { log } = require('../utils')
const { currentUser, loginRequired, adminRequired } = require('./main')

const main = express.Router()
const tokens = []

main.get('/', adminRequired, (request, response) => {
    const ms = Model.all()
    // log('debug ms', ms)
    const token = Math.random()
    // log('debug token', token)
    tokens.push(token)
    const args = {
        boards: ms,
        token: token,
    }
    response.render('board/index.html', args)
})

main.get('/new', (request, response) => {
    response.render('board/new.html')
})

main.post('/add', (request, response) => {
    const form = request.body
    const m = Model.create(form)
    response.redirect('/board')
})

main.get('/delete/:id', loginRequired, (request, response) => {
    const id = Number(request.params.id)
    const token = request.query.token
    // 这个地方有点问题，后面再来改一下，暂时不考虑 CORS 了
    const t = Model.remove(id)
    response.redirect('/board')
    // if (tokens.includes(token)) {
    //     const t = Model.remove(id)
    //     response.redirect('/board')
    // } else {
    //     response.status(403).send('我隐藏起来了')
    // }
})

main.get('/edit/:id', adminRequired, (request, response) => {
    const id = Number(request.params.id)
    const m = Model.get(id)
    log('Model', m)
    const args = {
        board: m
    }
    response.render('board/edit.html', args)
})

main.post('/update', (request, response) => {
    const form = request.body
    const m = Model.update(form)
    response.redirect('/board')
})

module.exports = {
    board: main
}