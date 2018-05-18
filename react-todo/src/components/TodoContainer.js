import React, { Component } from 'react'
import TodoItem from './TodoItem'
// 展示每一个 todo 的容器
class TodoContainer extends Component {
    state = {
        todos: [],
    }

    loadTodos = () => {
        const s = localStorage.todos
        if (s == undefinded) {
            s = '[]'
        }
        this.setState({ todos: s })
    }

    render() {
        const todoArray = this.state.todos.map(todo => {
            return (
                <TodoItem />
            )
        })
        return (
            { todoArray }
        )
    }
}

export default TodoContainer
