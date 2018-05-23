import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux'
const DEFAULT_HPP = '100'

const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='
const PARAM_HPP = 'hitsPerPage='

// function isSearched(searchTerm) {
//     return function(item) {
//         return item.title.toLowerCase().includes(searchTerm.toLowerCase())
//     }
// }

// const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase())

const Search = ({ value, onChange, onSubmit, children }) =>
    <form onSubmit={onSubmit}>
        <input
            type="text"
            value={value}
            onChange={onChange} />
        <button type="submit">
            {children}
        </button>
    </form>

const Table = ({ list, onDismiss }) => {
    return (
        <div className="table">
            {
                list.map(item => (
                    <div key={item.objectID} className="table-row">
                        <span style={{ width: '40%' }}>
                            <a href={item.url}>{item.url}</a>
                        </span>
                        <span style={{ width: '30%' }}>{item.title}</span>
                        <span style={{ width: '30%' }}>{item.author}</span>
                        <span style={{ width: '10%' }}>{item.num_comments}</span>
                        <span style={{ width: '10%' }}>{item.points}</span>
                        <span style={{ width: '10%' }}>
                            <Button
                                className="button-inline"
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

const Button = ({onClick, className='', children}) =>
    <button
        onClick={onClick}
        className={className}
        type="submit"
    >
        { children }
    </button>

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            result: null,
            searchTerm: DEFAULT_QUERY,
        }
        this.onSearchSubmit = this.onSearchSubmit.bind(this)
        this.setSearchTopStories = this.setSearchTopStories.bind(this)
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
        this.onDismiss = this.onDismiss.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
    }

    setSearchTopStories(result) {
        const { hits, page } = result
        const oldHits = page !== 0 ? this.state.result.hits : []
        const updatedHits = [
            ...oldHits,
            ...hits,
        ]
        this.setState({
            result: { hits: updatedHits, page}
        })
    }

    fetchSearchTopStories(searchTerm, page=0) {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(e => e)
    }

    onSearchSubmit(event) {
        const { searchTerm } = this.state
        this.fetchSearchTopStories(searchTerm)
        event.preventDefault()
    }

    componentDidMount() {
        const { searchTerm } = this.state
        this.fetchSearchTopStories(searchTerm)
    }

    onDismiss(id) {
        // filter 返回新列表
        const isNotId = item => item.objectID !== id
        const updatedHits = this.state.result.hits.filter(isNotId)
        this.setState({
            result: { ...this.state.result, hits: updatedHits }
        })
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value })
    }

  render() {
      const { searchTerm, result } = this.state
      const page = (result && result.page) || 0
      if (!result) {
          return null
      }
      return (
            <div className="page">
                <div className="interactions">
                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                        onSubmit={this.onSearchSubmit}
                    >
                        Search
                    </Search>
                </div>
                {
                    result &&
                    <Table
                        list={result.hits}
                        onDismiss={this.onDismiss}
                    />
                }
                <div className="interactions">
                    <Button onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}>
                        More
                    </Button>
                </div>
            </div>
        );
  }
}

export default App;
