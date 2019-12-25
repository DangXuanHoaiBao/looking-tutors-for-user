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
    studentGetAllCoursesNoReceived
});