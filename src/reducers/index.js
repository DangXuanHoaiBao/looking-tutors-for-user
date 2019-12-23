import {combineReducers} from 'redux';
import {signUp, login, getProfile, updateProfile, 
        getTeacherAll, getTeacherWithAddress, addSkill, getTeacherWithSalary, getTeacherWithSkill} from './user';

export default combineReducers({
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