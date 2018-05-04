/**
 * Created by Uncle Liu on 2018/5/2.
 */
const express = require('express')
const User = require('../models/user')
const Todo = require('../models/todo')
const { log } = require('../utils')
const { currentUser } = require('./main')

//弄一个全局变量保存页数
const pages = [1]

const index = express.Router()

index.get('/', (request, response) => {
    const page = pages[0]
    const userList = User.all()
    const todoList = Todo.todoPerPage(page)
    const totalPages = Todo.totalPages()
    const u = currentUser(request)
    const args = {
        users: userList,
        user: u,
        todos: todoList,
        totalPages: totalPages,
    }
    response.render('index/__index.html', args)
})

index.get('/login', (request, response) => {
    const args = {
        next_url: request.query.next_url || '',
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
    const u = User.register(form)
    if (u === null) {
        const args = {
            message: '用户名无效',
        }
        response.render('index/register.html', args)
    } else {
        response.redirect('/')
    }
})

index.get('/logout', (request, response) => {
    request.session = null
    response.redirect('/')
})

index.get('/changePage/:pageId', (request, response) => {
    const page = Number(request.params.pageId)
    pages.push(page)
    pages.shift(0)
    response.redirect('/')
})

module.exports = index