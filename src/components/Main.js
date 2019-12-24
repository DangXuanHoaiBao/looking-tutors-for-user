import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';

import Login from "./Login";
import SignUp from './SignUp';
import Home from './Home';
import SettingAccount from './SettingAccount';
import TeacherHome from './Teacher/TeacherHome';
import TeacherUpdate from './Teacher/TeacherUpdate';
import ClassDetail from './ClassDetail';
import StudentHome from './Student/StudentHome';
import Info from './Teacher/TeacherInfo';

import '../styles/App.css';

class Main extends React.Component{

  render(){

    return (
      <Switch>
          <Route exact path="/"> <Home /> </Route>
          <Route exact path="/login"> <Login/> </Route>
          <Route exact path="/sign-up"> <SignUp/> </Route>
          <Route exact path="/setting-account"> <SettingAccount/> </Route>
          <Route exact path="/class-detail" > <ClassDetail/> </Route>
          <Route exact path="/student"> <StudentHome/> </Route>
          <Route exact path="/info"><Info /></Route>
          <Route exact path="/update-profile"> <TeacherUpdate/> </Route>
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  data: state.login.data
})

export default connect(mapStateToProps)(Main);
