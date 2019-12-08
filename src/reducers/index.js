import {combineReducers} from 'redux';
import {sendInforToFormSignUp, signUp, login} from './user';

export default combineReducers({
    sendInforToFormSignUp,
    signUp,
    login
});