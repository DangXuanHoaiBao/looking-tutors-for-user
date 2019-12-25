/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from '../components/Home';
import TeacherHome from '../components/Teacher/TeacherHome';
import StudentHome from '../components/Student/StudentHome';
import TeacherInfo from '../components/Teacher/TeacherInfo';
import StudentInfo from '../components/Student/StudentInfo';

const PrivateStartPage = ({...rest }) => {
    const getData = JSON.parse(localStorage.getItem('data'));
    console.log(getData);
    if(!getData || getData.user.role === ''){
        return(
            <Route {...rest} render={props => (
                <Home />
            )} />
        );
    }
    if(getData.user.role === 'teacher'){
        return(
            <Route {...rest} render={props => (
                <TeacherHome />
            )} />
        );
    }
    if(getData.user.role === 'student'){
        return(
            <Route {...rest} render={props => (
                <StudentHome />
            )} />
        );
    }
}

const PrivateInfo = ({...rest }) => {
    const getData = JSON.parse(localStorage.getItem('data'));
    console.log(getData);
    if(!getData || getData.user.role === ''){
        return(
            <Route {...rest} render={props => (
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )} />
        );
    }
    if(getData.user.role === 'teacher'){
        console.log('teacher home ');
        return(
            <Route {...rest} render={props => (
                <TeacherInfo />
            )} />
        );
    }
    if(getData.user.role === 'student'){
        return(
            <Route {...rest} render={props => (
                <StudentInfo />
            )} />
        );
    }
}

const PrivateAllPage = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('data')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

const IsLogin = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !localStorage.getItem('data')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)



const Private = {
    PrivateStartPage,
    PrivateAllPage,
    IsLogin,
    PrivateInfo
};
export default Private;