import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import history from '../helpers/history';

import Login from "../components/Login";
import SignUp from '../components/SignUp';
import Home from '../components/Home';
import SettingAccount from '../components/SettingAccount';
import TeacherHome from './Teacher/TeacherHome';
import TeacherDetail from './Teacher/TeacherDetail';
import TeacherUpdate from './Teacher/TeacherUpdate';
import StudentHome from './Student/StudentHome';
import StudentUpdate from './Student/StudentUpdate';
import StudentDetail from './Student/StudentDetail';
import AddNewCourse from './Student/NewCourse';
import ActivatedAccount from './ActivatedAccount';
import AllCourses from './Student/AllCourses';
import Contract from './Contract';

import '../styles/App.css';

class App extends React.Component{

  render(){

    const {data} = this.props;
    let teacher = true;
    if(data){
      if(data.user.role === "renter"){
        teacher = false;
      }
    }
    return (
      <Router history={history}>
        <Switch>
          {!data ?
            <>
              <Route exact path="/contract"> <Contract/></Route>
              <Route exact path="/login"> <Login/> </Route>
              <Route exact path="/setting-account"> <SettingAccount/> </Route>
              <Route axact path="/activated-account"> <ActivatedAccount/> </Route>
              <Route exact path="/detail" > <TeacherDetail/> </Route>
              <Route exact path="/sign-up"> <SignUp/> </Route>
              <Route exact path="/"> <Home /> </Route>
            </>
          :
            <>
              {teacher?
                <>
                  <Route exact path="/update-profile"> <TeacherUpdate/> </Route>
                  <Route exact path="/detail" > <TeacherDetail/> </Route>
                  <Route exact path="/"> <TeacherHome/> </Route>
                </>
              :
                <>
                  <Route exact path="/student-update"> <StudentUpdate/> </Route>
                  <Route exact path="/add-new-course"> <AddNewCourse/> </Route>
                  <Route exact path="/all-courses"> <AllCourses/> </Route>
                  <Route exact path="/detail"> <StudentDetail/> </Route>
                  <Route exact path="/"> <StudentHome/> </Route>
                </>
              }
            </>
          }

        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  data: state.login.data
})

export default connect(mapStateToProps)(App);

