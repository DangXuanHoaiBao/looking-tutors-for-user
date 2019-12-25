const data = JSON.parse(localStorage.getItem('data'));
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

export const getAllCoursesNoRequest = (state = {}, action ) => {
    switch(action.type){
        case 'GET_ALL_COURSES_NO_REQUEST': {
            return {
                ...state,
                allCoursesNoRequest: action.allCoursesNoRequest
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

export const teacherGetAllCoursesNoRequest = (state = {}, action) => {
    switch(action.type){
        case 'TEACHER_GET_ALL_COURSES_NO_REQUEST': {
            return {
                ...state,
                allCoursesNoRequest: action.courses
            }
        }
        default: return state;
    }
}

export const teacherGetAllCoursesRequestingTeach = (state = {}, action) => {
    switch(action.type){
        case 'TEACHER_GET_ALL_COURSES_REQUESTING_TEACH': {
            return {
                ...state,
                allCoursesRequestingTeach: action.courses
            }
        }
        default: return state;
    }
}

export const teacherGetAllCoursesRequestingReceivedTeach = (state = {}, action) => {
    switch(action.type){
        case 'TEACHER_GET_ALL_COURSES_REQUESTING_RECEIVED_TEACH': {
            return {
                ...state,
                allCoursesRequestingReceivedTeach: action.courses
            }
        }
        default: return state;
    }
}

export const studentGetAllCoursesRequestingReceivedTeach = (state = {}, action) => {
    switch(action.type){
        case 'STUDENT_GET_ALL_COURSES_REQUESTING_RECEIVED_TEACH': {
            return {
                ...state,
                allCoursesRequestingReceivedTeach: action.courses
            }
        }
        default: return state;
    }
}

export const studentGetAllCoursesNoReceived = (state = {}, action) => {
    switch(action.type){
        case 'STUDENT_GET_ALL_COURSES_NO_RECEIVED': {
            return {
                ...state,
                allCoursesNoReceived: action.courses
            }
        }
        default: return state;
    }
}