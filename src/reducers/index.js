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
    
    teacherGetAllContractOffer,

    studentGetAllCoursesRequestingReceivedTeach,

    studentGetAllCoursesNoReceived,

    studentGetAllContract
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
    teacherGetAllContractOffer,

    studentGetAllCoursesRequestingReceivedTeach,
    studentGetAllCoursesNoReceived,
    studentGetAllContract,

    alert

});