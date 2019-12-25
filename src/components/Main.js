import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import {ToastContainer} from 'react-toastify';

import Private from '../helpers/private';
import Login from "./Login";
import SignUp from './SignUp';
import SettingAccount from './SettingAccount';
import AllCourses from './Student/AllCourses';
import AddNewCourse from './Student/NewCourse';
import Contract from './Contract';

import '../styles/App.css';

class Main extends React.Component{

  render(){

    return (
      <Switch>
          <Private.PrivateStartPage exact path="/" />
          <Private.IsNotLogin exact path="/login" component={Login} />
          <Private.IsNotLogin exact path="/sign-up" component={SignUp} />
          <Private.IsNotLogin exact path="/setting-account" component={SettingAccount} />
          <Private.PrivateInfo exact path="/info" />
          <Private.PrivateDetail exact path="/detail" />
          <Private.IsLogin exact path="/add-new-course" component={AddNewCourse} />
          <Private.PrivateAllCoursesOfStudent exact path="/all-courses"  />
          <Private.IsLogin exact path="/create-contract" component={Contract} />
        
          <ToastContainer />
      </Switch>
      
    );
  }
} 

const mapStateToProps = state => ({
  data: state.login.data
})

export default connect(mapStateToProps)(Main);
