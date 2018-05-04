log('我是不可能被打倒的');

var addTodoCallback = function() {
    var todoInput = e('#id-input-todo')
    // 取的 todo 内容，是否完成
    var content = todoInput.value
    var done = false
    var ct = now()
    // log('debug ct', ct)
    // 构造 todo
    var todo = {
        done: done,
        content: content,
        ct: ct,
        ut: ct,
    }
    // log('debug todo', todo)
    insertTodo(todo)
    saveTodos()
}

var insertTodo = function(todo) {
    var todoContainer = e('#id-div-container')
    var t = templateTodo(todo)
    todoContainer.insertAdjacentHTML('beforeend', t);
}

var templateTodo = function(todo) {
    // var status = ''
    // if(done) {
    //     status = 'done'
    // }
    // var createdTime = now()
    // 这个地方写的不简洁啊
    var status = todo.done ? 'done' : ''
    var todoContent = todo.content
    var createdTime = todo.ct
    var updatedTime = todo.ut

    var t = `
        <div class='todo-cell ${status}'>
            <span class='todo-content' contenteditable='true'>${todoContent}</span>
            <span class='todo-created-time'>${createdTime}</span>
            <span class='todo-updated-time'>${updatedTime}</span>
            <button class='todo-done'>完成</button>
            <button class='todo-delete'>删除</button>
        </div>
    `
    return t
}

var save = function(array) {
    var s = JSON.stringify(array)
    localStorage.todos = s
}

var load = function() {
    var s = localStorage.todos
    if (s == undefined) {
        s = '[]'
    }
    return JSON.parse(s)
}

var saveTodos = function() {
    log('save todos')
    var contents = es('.todo-content')
    var todos = []
    for (var i = 0; i < contents.length; i++) {
        var c = contents[i]
        var done = c.parentElement.classList.contains('done')
        var todo = {
            done: done,
            content: c.innerHTML,
            ct: c.nextElementSibling.innerHTML,
            ut: c.nextElementSibling.nextElementSibling.innerHTML
        }
        todos.push(todo)
    }
    save(todos)
}

var loadTodos = function() {
    var todos = load()
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        // insertTodo(todo.content, todo.done)
        insertTodo(todo)
    }
}

// 给 add 绑定事件
var bindAddButton = function() {
    var addButton = e('#id-button-add')
    bindEvent(addButton, 'click', addTodoCallback)
}

var updateCompletedTime = function(element) {
    var ut = now()
    element.firstElementChild.nextElementSibling.nextElementSibling.innerHTML = ut

}

// 给 完成 和 删除 绑定事件
var bindCompleteAndDelete = function() {
    var todoContainer = e('#id-div-container')
    todoContainer.addEventListener('click', function(event){
        var target = event.target
        if(target.classList.contains('todo-done')) {
            var todoDiv = target.parentElement
            toggleClass(todoDiv, 'done')
            // 更新完成时间
            updateCompletedTime(todoDiv)
            saveTodos()
        } else if (target.classList.contains('todo-delete')) {
            var todoDiv = target.parentElement
            todoDiv.style.opacity = '0'
            setTimeout(function(){todoDiv.remove()}, 1000);
            // todoDiv.remove()
            saveTodos()
        }
    })
}

var main = function() {
    loadTodos()
    bindAddButton()
    bindCompleteAndDelete()
}

main()
