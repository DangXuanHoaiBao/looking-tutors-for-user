export const sendInforToFormSignUp = (state = {}, action) => {
    switch(action.type){
        case 'SEND_INFOR_TO_FORM_SIGN_UP': {
            return {
                ...state,
                fullName: action.fullName,
                email: action.email
            }
        }
        default: return state;
    }
}

export const signUp = (state = {}, action) => {
    switch(action.type){
        case 'SIGN_UP_SUCCESS': {
            return {
                ...state,
                message: action.message
            }
        }
        case 'SIGN_UP_FAIL':{
            return {
                ...state,
                message: action.message
            }
        }
        default: return state;
    }
}

const userInfo = localStorage.getItem('userInfo');
const stateDefault = userInfo ? {'userInfo': userInfo} : {};
export const login = (state = stateDefault, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS': {
            return {
                ...state,
                message: action.message,
                userInfo: action.userInfo
            }
        }
        case 'LOGIN_FAIL': {
            return {
                ...state,
                message: action.message
            }
        }
        case 'LOGOUT': {
            return {}
        }
        default: return state;
    }
}