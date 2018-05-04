// import React, { Component } from 'react';
// import './App.css';

// const list = [
//   {
//     title: 'React',
//     url: 'https://facebook.github.io/react/',
//     author: 'Jordan Walke',
//     num_comments: 3,
//     points: 4,
//     objectID: 0,
//   },
//   {
//     title: 'Redux',
//     url: 'https://github.com/reactjs/redux',
//     author: 'Dan Abramov, Andrew Clark',
//     num_comments: 2,
//     points: 5,
//     objectID: 1,
//   }
// ]

// // function isSearched(searchTerm) {
// //   return function(item) {
// //     return item.title.toLowerCase().includes(searchTerm.toLowerCase())
// //   }
// // }
// const isSearched = searchTerm => item => item.title.toLowerCase().includes(searchTerm.toLowerCase())

// class Button extends Component {
//   render() {
//     const {
//       onClick,
//       className = '',
//       children,
//     } = this.props

//     return (
//       <button
//         onClick={onClick}
//         className={className}
//         type="button"
//       >
//         { children }
//       </button>
//     )
//   }

// }

// // class Search extends Component {
// //   render() {
// //     const { value, onChange, children } = this.props
// //     return (
// //       <form>
// //         { children }
// //         <input 
// //           type="text" 
// //           onChange={onChange}
// //           value={value}
// //         />
// //       </form>      
// //     )
// //   }
// // }

// // const Search = ({ value, onChange, children }) => 
// //   <form>
// //     { children }
// //     <input 
// //       type="text" 
// //       onChange={onChange}
// //       value={value}
// //     />
// //   </form>      

// const Search = ({ value, onChange, children }) => {
//   // do something here.
//   return (
//     <form>
//       { children }
//       <input 
//         type="text" 
//         onChange={onChange}
//         value={value}
//       />
//     </form>      
//   )
// }

// class Table extends Component {
//   render() {
//     const { list, pattern, onDismiss } = this.props
//     return (
//       <div>
//         {
//           list.filter(isSearched(pattern)).map(item => { // 这个地方是错误的，不该加大括号。我的理解是没有大括号就直接返回。
//             <div key={item.objectID}>
//               <span>
//                 <a href="{item.url}">{item.title}</a>
//               </span>
//               <span>{item.title}</span>
//               <span>{item.num_comments}</span>
//               <span>{item.points}</span>
//               <span>
//                 <Button
//                   onClick={() => onDismiss(item.objectID)}                  
//                 >
//                   Dismiss
//                 </Button>
//               </span>
//             </div>
//           })
//         }
//       </div>
//     )
//   }
// }

// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       list: list,
//       searchTerm: '',
//     }
//     this.onDismiss = this.onDismiss.bind(this)
//     this.onClickMe = this.onClickMe.bind(this)
//     this.onSearchChange = this.onSearchChange.bind(this)
//   }
  
//   onDismiss(id) {
//     const updatedList = this.state.list.filter(function isNotId(item) {
//       return item.objectID !== id
//     })
//     this.setState({
//       list: updatedList,
//     })
//   }

//   onClickMe() {
//     console.log(this)
//   }

//   onSearchChange(event) {
//     this.setState({
//       searchTerm: event.target.value
//     })
//   }

//   render() {
//     const helloWorld = 'Welcome to the Road to learn React.'
//     const { searchTerm, list } = this.state
//     return (
//       <div className="page">
//         <div className="interactions">
//           <h2>{helloWorld}</h2>
//           <Search 
//             value={searchTerm}
//             onChange={this.onSearchChange}
//           >
//             Search
//           </Search>
//         </div>
//         <Table 
//           list={list}
//           pattern={searchTerm}
//           onDismiss={this.onDismiss}
//         />
//         <div>
//           <button
//             onClick={this.onClickMe}
//             type="button"
//           >
//             Click Me
//           </button>          
//         </div>        
//       </div>
//     );
//   }
// }

// export default App;

import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux'
const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='

const url = `${PATH_BASE}${PATH_SEARCH}${PARAM_SEARCH}${DEFAULT_QUERY}`

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const isSearched = searchTerm => item =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: '',
    };

    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedList = this.state.list.filter(isNotId);
    this.setState({ list: updatedList });
  }

  render() {
    const { searchTerm, list } = this.state;
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
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) =>
  <form>
    {children} <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>

const Table = ({ list, pattern, onDismiss }) =>
  <div className="table">
    {list.filter(isSearched(pattern)).map(item =>
      <div key={item.objectID} className="table-row">
        <span style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%' }}>
          {item.author}
        </span>
        <span style={{ width: '10%' }}>
          {item.num_comments}
        </span>
        <span style={{ width: '10%' }}>
          {item.points}
        </span>
        <span style={{ width: '10%' }}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>

const Button = ({
  onClick,
  className = '',
  children,
}) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

export default App;