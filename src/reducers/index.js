import {combineReducers} from 'redux';
import {
    login, 
    getProfile, 
    getTeacherAll, 
    getTeacherWithAddress, 
    getTeacherWithSalary, 
    getTeacherWithSkill,

    teacherGetAllCoursesNoRequest,

    teacherGetAllCoursesRequestingTeach,

    teacherGetAllCoursesRequestingReceivedTeach,

    studentGetAllCoursesRequestingReceivedTeach,

    studentGetAllCoursesNoReceived
} from './user';
import alert from './alert';


export default combineReducers({
    login,
    getProfile,
    getTeacherAll,
    getTeacherWithAddress,
    getTeacherWithSalary,
    getTeacherWithSkill,


    teacherGetAllCoursesNoRequest,
    teacherGetAllCoursesRequestingTeach,
    teacherGetAllCoursesRequestingReceivedTeach,

    studentGetAllCoursesRequestingReceivedTeach,
    studentGetAllCoursesNoReceived,

    alert

});