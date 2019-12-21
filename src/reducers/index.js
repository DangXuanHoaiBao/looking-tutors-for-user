import {combineReducers} from 'redux';
import {sendInforToFormSignUp, signUp, login, getProfile, updateProfile, 
        getTeacherAll, getTeacherWithAddress, addSkill, getTeacherWithSalary, getTeacherWithSkill} from './user';

export default combineReducers({
    sendInforToFormSignUp,
    signUp,
    login,
    getProfile,
    updateProfile,
    getTeacherAll,
    getTeacherWithAddress,
    getTeacherWithSalary,
    getTeacherWithSkill,
    addSkill
});