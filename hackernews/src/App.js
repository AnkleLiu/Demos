import React, { Component } from 'react';
import Table from './Table/index'
import Button from './Button/index'
import Search from './Search/index'
import './App.css';

import {
    DEFAULT_QUERY,
    DEFAULT_HPP,
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    PARAM_PAGE,
    PARAM_HPP,
} from './constants/index.js'

// function isSearched(searchTerm) {
//     return function(item) {
//         return item.title.toLowerCase().includes(searchTerm.toLowerCase())
//     }
// }

// const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase())

const withLoading = (Component) => ({ isLoading, ...rest }) => isLoading ? <Loading /> : <Component {...rest} />

const ButtonWithLoading = withLoading(Button)

const Loading = () => <div>Loading...</div>

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // result: null,
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            error: null,
            isLoading: false,
        }
        this.onSearchSubmit = this.onSearchSubmit.bind(this)
        this.setSearchTopStories = this.setSearchTopStories.bind(this)
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
        this.onDismiss = this.onDismiss.bind(this)
        this.onSearchChange = this.onSearchChange.bind(this)
        this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this)
    }

    setSearchTopStories(result) {
        const { hits, page } = result
        const { searchKey, results } = this.state
        const oldHits = results && results[searchKey]
                        ? results[searchKey].hits : []
        const updatedHits = [
            ...oldHits,
            ...hits,
        ]
        this.setState({
            results: {
                ...results,
                [searchKey]: { hits: updatedHits, page }
            },
            isLoading: false
        })
    }

    fetchSearchTopStories(searchTerm, page=0) {
        this.setState({ isLoading: true })
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result))
            .catch(e => this.setState({ error: e }))
    }

    onSearchSubmit(event) {
        const { searchTerm } = this.state
        this.setState({ searchKey: searchTerm })
        if (this.needsToSearchTopStories(searchTerm)) {
            this.fetchSearchTopStories(searchTerm)
        }
        event.preventDefault()
    }

    componentDidMount() {
        const { searchTerm } = this.state
        this.setState({ searchKey: searchTerm })
        this.fetchSearchTopStories(searchTerm)
    }

    onDismiss(id) {
        const { searchKey, results } = this.state
        const { hits, page } = results[searchKey]
        // filter 返回新列表
        const isNotId = item => item.objectID !== id
        const updatedHits = hits.filter(isNotId)
        this.setState({
            results: {
                ...results,
                [searchKey]: { hits: updatedHits, page }
            }
        })
    }

    needsToSearchTopStories(searchTerm) {
        return !this.state.results[searchTerm]
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value })
    }

  render() {
      const { searchTerm, results, searchKey, error, isLoading } = this.state
      const page = (
            results &&
            results[searchKey] &&
            results[searchKey].page) || 0
      // if (!result) {
      //     return null
      // }
      // if (error) {
      //     return <p>Something went wrong.</p>
      // }
      const list = (
          results &&
          results[searchKey] &&
          results[searchKey].hits
      ) || []
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
                    error
                    ? <div className="interactions"><p>Something went wrong.</p></div>
                    : <Table
                        list={list}
                        onDismiss={this.onDismiss}/>
                }
                <div className="interactions">
                {
                    <ButtonWithLoading
                        isLoading={isLoading}
                        onClick={() => this.fetchSearchTopStories(searchKey, page + 1)} >
                        More
                    </ButtonWithLoading>
                }
                </div>
            </div>
        );
  }
}

export default App;
