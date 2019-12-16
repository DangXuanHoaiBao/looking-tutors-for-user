import {combineReducers} from 'redux';
import {sendInforToFormSignUp, signUp, login,getProfile, updateProfile, getTeacherAll, deleteSkill} from './user';

export default combineReducers({
    sendInforToFormSignUp,
    signUp,
    login,
    getProfile,
    updateProfile,
    getTeacherAll,
    deleteSkill
});