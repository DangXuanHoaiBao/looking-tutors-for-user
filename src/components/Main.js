import React from 'react';
import { Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import {ToastContainer} from 'react-toastify';

import Private from '../helpers/private';
import Login from "./Login";
import SignUp from './SignUp';
import SettingAccount from './SettingAccount';

import '../styles/App.css';

class Main extends React.Component{

  render(){

    return (
      <Switch>
          <Private.PrivateStartPage exact path="/" />
          <Private.IsLogin exact path="/login" component={Login} />
          <Private.IsLogin exact path="/sign-up" component={SignUp} />
          <Private.IsLogin exact path="/setting-account" component={SettingAccount} />
          <Private.PrivateInfo exact path="/info" />
          <ToastContainer />
      </Switch>
      
    );
  }
} 

const mapStateToProps = state => ({
  data: state.login.data
})

export default connect(mapStateToProps)(Main);
