import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../helpers/history';

import Login from "../components/Login";
import SignUp from '../components/SignUp';
import Home from '../components/Home';
import SettingAccount from '../components/SettingAccount';
import TeacherHome from './Teacher/TeacherHome';
import TeacherProfile from './Teacher/TeacherProfile';
import TeacherUpdate from './Teacher/TeacherUpdate';

import '../styles/App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    const {logout} = this.props;
    logout();
    history.push('/');
  }

  render(){

    return (
      <Router history={history}>
      
        <Switch>
          <Route exact path="/login"> <Login /> </Route>
          <Route exact path="/sign-up"> <SignUp /> </Route>
          <Route exact path="/setting-account"> <SettingAccount /> </Route>
          {/* <Route exact path="/class-detail" > <ClassDetail /> </Route> */}

          <Route exact path="/teacher"> <TeacherHome /> </Route>
          <Route exact path="/teacher/profile" > <TeacherProfile /> </Route>
          <Route exact path="/teacher/update-profile"> <TeacherUpdate /> </Route>

          <Route exact path="/"> <Home /> </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
