import React, { Component } from 'react';
import './App.css';

const list = [
    {
        title: 'React',
        url: 'https://google.com',
        author: 'Someone',
        num_comments: 3,
        points: 4,
        objectID: 0,
    },
    {
        title: 'Redux',
        url: 'z.cn',
        author: 'who',
        num_comments: 4,
        points: 6,
        objectID: 1,
    }
]

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: list,
        }
        this.onDismiss = this.onDismiss.bind(this)
    }

    onDismiss(id) {
        // filter 返回新列表
        const updatedList = this.state.list.filter(item => item.objectID !== id)
        this.setState({ list: updatedList })
    }

  render() {
    return (
        <div className="App">
            {
                this.state.list.map(item => (
                    <div key={item.objectID}>
                        <span>
                            <a href={item.url}>{item.url}</a>
                        </span>
                        <span>{item.author}</span>
                        <span>{item.num_comments}</span>
                        <span>{item.points}</span>
                        <span>
                            <button
                                type="button"
                                onClick={() => this.onDismiss(item.objectID)}>
                                Dismiss
                            </button>
                        </span>
                    </div>
                ))
            }
        </div>
    );
  }
}

export default App;
