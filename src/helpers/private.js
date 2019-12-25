/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Home from '../components/Home';
import TeacherHome from '../components/Teacher/TeacherHome';
import StudentHome from '../components/Student/StudentHome';
import TeacherInfo from '../components/Teacher/TeacherInfo';
import StudentInfo from '../components/Student/StudentInfo';
import StudentDetail from '../components/Student/StudentDetail';
import TeacherDetail from '../components/Teacher/TeacherDetail';
import AllCourses from '../components/Student/AllCourses';

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
        console.log('teacher home ');
        return(
            <Route {...rest} render={props => (
                <TeacherHome />
            )} />
        );
    }
    if(getData.user.role === 'renter'){
        return(
            <Route {...rest} render={props => (
                <StudentHome />
            )} />
        );
    }
}

const PrivateAllCoursesOfStudent = ({...rest }) => {
    const getData = JSON.parse(localStorage.getItem('data'));
    if(!getData || getData.user.role === ''){
        return(
            <Route {...rest} render={props => (
                <Home />
            )} />
        );
    }
    if(getData.user.role === 'renter'){
        return(
            <Route {...rest} render={props => (
                <AllCourses />
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

const PrivateDetail = ({...rest }) => {
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
        return(
            <Route {...rest} render={props => (
                <TeacherDetail />
            )} />
        );
    }
    if(getData.user.role === 'renter'){
        return(
            <Route {...rest} render={props => (
                <StudentDetail />
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

const IsNotLogin = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        !localStorage.getItem('data')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
)

const IsLogin = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('data')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)



const Private = {
    PrivateStartPage,
    PrivateAllPage,
    IsLogin,
    IsNotLogin,
    PrivateInfo,
    PrivateDetail,
    PrivateAllCoursesOfStudent
};
export default Private;