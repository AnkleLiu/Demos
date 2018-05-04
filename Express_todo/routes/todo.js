/**
 * Created by Uncle Liu on 2018/5/2.
 */
const express = require('express')
const Todo = require('../models/todo')
const { log } = require('../utils')
const { loginRequired, currentUser } = require('./main')

const todo = express.Router()

todo.get('/', loginRequired, (request, response) => {
    const todoList = Todo.all()
    // 用一个 filter 过滤出这个用户的 todo
    const u = currentUser(request)
    const user_id = u.id
    const userTodoList = todoList.filter(t => {
        return t.user_id === user_id
    })
    const args = {
        user: u,
        todos: userTodoList,
    }
    response.render('todo/index.html', args)
})

todo.post('/add', (request, response) => {
    const form = request.body
    const u = currentUser(request)
    const kwargs = {
        user_id: u.id,
    }
    const t = Todo.create(form, kwargs)
    response.redirect('/todo')
})

todo.get('/delete/:todoId', (request, response) => {
    const todoId = Number(request.params.todoId)
    const t = Todo.remove(todoId)
    response.redirect('/todo')
})

todo.get('/edit/:todoId', (request, response) => {
    const id = Number(request.params.todoId)
    const t = Todo.get(id)
    const args = {
        todo: t,
    }
    response.render('todo/edit.html', args)
})

todo.post('/update', (request, response) => {
    const form = request.body
    const t = Todo.update(form)
    response.redirect('/todo')
})

todo.get('/complete/:todoId', (request, response) => {
    const id = Number(request.params.todoId)
    const t = Todo.complete(id, true)
    response.redirect('/todo')
})

module.exports = todo