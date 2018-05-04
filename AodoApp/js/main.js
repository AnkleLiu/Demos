// 封装一些常用函数
var log = function () {
    console.log.apply(console, arguments)
}

var e = function(selector) {
    return document.querySelector(selector)
}

var toggleClass = function(element, className) {
    // 检查元素是否拥有某个 classs
    if (element.classList.contains(className)) {
        // 拥有则删除之
        element.classList.remove(className)
    } else {
        // 没有则加上
        element.classList.add(className)
    }
}

var data = {
    todo: [],
    completed: [],
}

// 定义一个函数， 用于把 数组 写入 localStorage
var save = function(array) {
    var s = JSON.stringify(array)
    localStorage.todos = s
}

// 定义一个函数， 读取 localStorage 中的数据并解析返回
var load = function() {
    var s = localStorage.todos
    return JSON.parse(s)
}

var saveTodos = function() {
    // 1 先选出所有的 content 标签
    // 2 取出 todo
    // 3 添加到一个 数组中
    // 4 保存数组
    // log('save todos')
    var contents = document.querySelectorAll('.todo-cell')
    log('contents', contents)
    var todos = []
    for (var i = 0; i < contents.length; i++) {
        var c = contents[i]
        log('todoText', c.firstChild.innerHTML)
        var done = c.classList.contains('done')
        var todo = {
            done: done,
            content: c.innerHTML,
        }
        // 添加到数组中
        todos.push(todo)
    }
    console.log('debug todos', todos);
    // // 保存数组
    // save(todos)
}

// 给添加按钮绑定事件
var addButton = e('#id-button-add')
addButton.addEventListener('click', function(event) {
    var value = e('#id-input-item').value
    if (value) {
        // log('There is a value')
        addItemTodo(value)
        e('#id-input-item').value = ''
        // data.todo.push(value)
        // log('add button', data)
        saveTodos()
    }
})

function addItemTodo(text) {
    // console.log('hello');
    var todoList = e('#todo')
    var t = `
        <li class="todo-cell">
            <span class="todo-span">${text}</span>
            <div class="buttons">
                <button class="remove">移除</button>
                <button class="complete">完成</button>
            </div>
        </li>`
    todoList.insertAdjacentHTML('afterbegin', t)
}

var buildTodoObject = function() {

}

// 把删除、完成等事件绑定在父元素上
var todoContainer = e('.container')
todoContainer.addEventListener('click', function(event) {
    // log('container clicked', event, event.target)
    var target = event.target
    if (target.classList.contains('remove')) {
        // log('remove button clicked')
        var todoLi = target.parentElement.parentElement
        todoLi.remove()
    } else if (target.classList.contains('complete')) {
        // log('complete button clicked')
        var todoSpan = target.parentElement.previousSibling.previousSibling
        var todoText = todoSpan.innerHTML
        log('todo-span', todoSpan)
        log('todo-text', todoText)
        toggleClass(todoSpan, 'done')
        // 这时候应该去构造一个 todo 对象，包括 todoText, done 状态，甚至是时间
        // 然后去 saveTodos
        // 或者在 saveTodos 里面构造
        saveTodos()
        // if (todoLi.classList.contains('done')) {
        //     data.todo.splice(data.todo.indexOf(value), 1)
        //     data.completed.push(value)
        // } else {
        //     data.completed.splice(data.completed.indexOf(value), 1)
        //     data.todo.push(value)
        // }
        // log(data)
    }
})
