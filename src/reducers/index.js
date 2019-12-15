import {combineReducers} from 'redux';
import {sendInforToFormSignUp, signUp, login, updateProfile, getTeacherAll} from './user';

export default combineReducers({
    sendInforToFormSignUp,
    signUp,
    login,
    updateProfile,
    getTeacherAll
});