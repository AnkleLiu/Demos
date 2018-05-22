import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux'
const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`

// const list = [
//     {
//         title: 'React',
//         url: 'https://google.com',
//         author: 'Someone',
//         num_comments: 3,
//         points: 4,
//         objectID: 0,
//     },
//     {
//         title: 'Redux',
//         url: 'z.cn',
//         author: 'who',
//         num_comments: 4,
//         points: 6,
//         objectID: 1,
//     }
// ]

function isSearched(searchTerm) {
    return function(item) {
        return item.title.toLowerCase().includes(searchTerm.toLowerCase())
    }
}

// const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase())

const Search = ({ value, onChange, children }) =>
    // const { value, onChange, children } = this.props
    // return (
    <form>
        { children }
        <input
            type="text"
            value={value}
            onChange={onChange} />
    </form>
    // )


const Table = ({ list, pattern, onDismiss }) =>
    <div className="table">
        {
            list.filter(isSearched(pattern)).map(item => (
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

const Button = ({onClick, className='', children}) =>
    // const {
    //     onClick,
    //     className = '',
    //     children,
    // } = this.props
    // return (
    <button
        onClick={onClick}
        className={className}
        type="button"
    >
        { children }
    </button>
    // )

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            result: null,
            searchTerm: DEFAULT_QUERY,
        }
        this.setSearchTopStories = this.setSearchTopStories.bind(this)
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
        this.onDismiss = this.onDismiss.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
    }

    setSearchTopStories(result) {
        this.setState({ result })
    }

    fetchSearchTopStories(searchTerm) {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(e => e)
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

      if (!result) {
          return null
      }
      console.log(result);
        return (
            <div className="page">
                <div className="interactions">
                    <Search
                        value={searchTerm}
                        onChange={this.onSearchChange}
                    >
                        Search
                    </Search>
                </div>
                <Table
                    list={result.hits}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss}
                />
            </div>
        );
  }
}

export default App;
