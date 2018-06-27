import React, { Component } from 'react';
import Navbar from './components/Navbar'
import logo from './logo.svg';
import classes from './App.css';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <header className={classes.AppHeader}>
          <img src={logo} className={classes.AppLogo} alt="logo" />
          <h1 className={classes.AppTitle}>Welcome to React</h1>
        </header>
        <p className={classes['App-intro']}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Navbar />
      </div>
    );
  }
}

export default App;
