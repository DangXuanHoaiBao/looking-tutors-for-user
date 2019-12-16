import {combineReducers} from 'redux';
import {sendInforToFormSignUp, signUp, login, getProfile, updateProfile, getTeacherAll, addSkill} from './user';

export default combineReducers({
    sendInforToFormSignUp,
    signUp,
    login,
    getProfile,
    updateProfile,
    getTeacherAll,
    addSkill
});