import React from 'react';
import { Router } from 'react-router-dom';
import {connect} from 'react-redux';
import history from '../helpers/history';

import Header from './Header';
import Footer from './Footer';
import Main from './Main';

import '../styles/App.css';

class App extends React.Component{

  render(){

    return (
      <Router history={history}>
        <Header />
        <Main />
        <Footer />
    </Router>
    );
  }
}

const mapStateToProps = state => ({
  data: state.login.data
})

export default connect(mapStateToProps)(App);

