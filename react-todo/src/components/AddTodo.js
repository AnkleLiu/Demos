import React, { Component } from 'react'

class AddTodo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '',
            todoItems: [],
        }
        this.handleChange = this.handleChange.bind(this)
        this.saveTodo = this.saveTodo.bind(this)
    }

    handleChange(e) {
        const content = e.target.value
        this.setState({ content: content })
    }

    saveTodo() {
        console.log('saveTodo')
        console.log(this.state.content);
        const i = {
            content: this.state.content,
            id: Date.now(),
        }
        this.setState(prevState => {
            return {
                todoItems: prevState.todoItems.concat(i),
                content: '',
            }
        })
    }

    render() {
        return (
            <div>
                <input type="text" placeholder="添加一个 todo" onChange={this.handleChange}/>
                <button onClick={this.saveTodo}>保存</button>
            </div>
        )
    }
}

export default AddTodo
