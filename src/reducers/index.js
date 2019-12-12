import {combineReducers} from 'redux';
import {sendInforToFormSignUp, signUp, login, getTeacherAll} from './user';

export default combineReducers({
    sendInforToFormSignUp,
    signUp,
    login,
    getTeacherAll
});