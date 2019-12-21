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


const data = localStorage.getItem('data');
const stateDefault = data ? {'data': data} : {};
export const login = (state = stateDefault, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS': {
            return {
                ...state,
                message: action.message,
                data: action.data
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

export const signUp_Login_With_Google_Facebook = (state = stateDefault, action) => {
    switch (action.type){
        case 'SUCCESS_WITH_GOOGLE_FACEBOOK': {
            return {
                ...state,
                message: action.message,
                data: action.data
            }
        }
        case 'FAIL_WITH_GOOGLE_FACEBOOK': {
            return {
                ...state,
                message: action.message
            }
        }
        default: return state;
    }

}

export const getProfile = (state = {}, action) => {
    switch(action.type){
        case 'GET_PROFILE_SUCCESS': {
            return {
                ...state,
                userProfile: action.userProfile
            }
        }
        default: return state;
    }
}

export const getTeacherAll = (state = {}, action ) => {
    switch(action.type){
        case 'GET_TEACHER_ALL_SUCCESS': {
            return {
                ...state,
                teacherAll: action.teacherAll
            }
        }
        default: return state;
    }
}

export const getTeacherWithAddress = (state = {}, action) => {
    switch(action.type){
        case 'GET_TEACHER_WITH_ADDRESS': {
            return {
                ...state,
                teacherAddress: action.teacherAddress
            }
        }
        default: return state;
    }
}

export const getTeacherWithSalary = (state = {}, action) => {
    switch(action.type){
        case 'GET_TEACHER_WITH_SALARY': {
            return {
                ...state,
                teacherSalary: action.teacherSalary
            }
        }
        default: return state;
    }
}

export const getTeacherWithSkill = (state = {}, action) => {
    switch(action.type){
        case 'GET_TEACHER_WITH_SKILL': {
            return {
                ...state,
                teacherSkill: action.teacherSkill
            }
        }
        default: return state;
    }
}

export const updateProfile = (state = {}, action) => {
    switch(action.type){
        case 'UPDATE_PROFILE_SUCCESS': {
            return {
                ...state,
                message: action.message
            }
        }
        case 'UPDATE_PROFILE_FAIL': {
            return {
                ...state,
                message: action.message
            }
        }
        default: return state;
    }
}

export const addSkill = (state = {}, action) => {
    switch(action.type){
        case 'ADD_SKILL_SUCCESS': {
            return {
                ...state,
                message: action.message
            }
        }
        default: return state;
    }
}