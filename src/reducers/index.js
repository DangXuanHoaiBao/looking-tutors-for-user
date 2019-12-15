import {combineReducers} from 'redux';
import {sendInforToFormSignUp, signUp, login, getProfile, getTeacherAll} from './user';

export default combineReducers({
    sendInforToFormSignUp,
    signUp,
    login,
    getProfile,
    getTeacherAll
});