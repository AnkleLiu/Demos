import React, { Component } from 'react'
// 单一 todo
class TodoItem extends Component {
    state = {
        content: 'test',
        finished: true,
        deleted: true,
    }

    render() {
        return (
            <div>
                <span>{this.state.content}</span>
                <br />
                <span>{this.state.finished ? '完成' : '未完成'}</span>
                <br />
                <span>{this.state.deleted ? '删除' : '不删除'}</span>
            </div>
        )
    }
}

export default TodoItem
