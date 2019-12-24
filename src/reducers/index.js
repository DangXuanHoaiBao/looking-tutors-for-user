import {combineReducers} from 'redux';
import {signUp, login, getProfile, getTeacherAll, getTeacherWithAddress, getTeacherWithSalary, getTeacherWithSkill,
        sendCodeActivatedAccountByEmail, activatedAccount, getAllCourses} from './user';
import alert from './alert';

export default combineReducers({
    signUp,
    login,
    getProfile,
    getTeacherAll,
    getTeacherWithAddress,
    getTeacherWithSalary,
    getTeacherWithSkill,
    sendCodeActivatedAccountByEmail,
    activatedAccount,
    getAllCourses,
    alert
});