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

function isSearched(searchTerm) {
    return function(item) {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase())
    }
}

// const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase())

class Search extends Component {
    render() {
        const { value, onChange, children } = this.props
        return (
            <form>
                { children }
                <input
                    type="text"
                    value={value}
                    onChange={onChange} />
            </form>
        )
    }
}

class Table extends Component {
    render() {
        const { list, pattern, onDismiss } = this.props
        return (
            <div>
                {
                    list.filter(isSearched(pattern)).map(item => (
                        <div key={item.objectID}>
                            <span>
                                <a href={item.url}>{item.url}</a>
                            </span>
                            -
                            <span>{item.title}</span>
                            -
                            <span>{item.author}</span>
                            -
                            <span>{item.num_comments}</span>
                            -
                            <span>{item.points}</span>
                            <span>
                                <Button
                                    onClick={() => onDismiss(item.objectID)}>
                                    Dismiss
                                </Button>
                            </span>
                        </div>
                    ))
                }
            </div>
        )
    }
}

class Button extends Component {
    render() {
        const {
            onClick,
            className = '',
            children,
        } = this.props
        return (
            <button
                onClick={onClick}
                className={className}
                type="button"
            >
                { children }
            </button>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: list,
            searchTerm: '',
        }
        this.onDismiss = this.onDismiss.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
    }

    onDismiss(id) {
        // filter 返回新列表
        const updatedList = this.state.list.filter(item => item.objectID !== id)
        this.setState({ list: updatedList })
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value })
    }

  render() {
      const { searchTerm, list } = this.state
        return (
            <div className="App">
                <Search
                    value={searchTerm}
                    onChange={this.onSearchChange}
                >
                    Search
                </Search>
                <Table
                    list={list}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss}
                />
            </div>
        );
  }
}

export default App;
