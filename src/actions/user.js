/* eslint-disable no-restricted-globals */
import history from '../helpers/history';
import config from '../config/api-config';
import authHeader from '../helpers/auth-header';
import alertActions from '../actions/alert';

function signUp(fullName, email, password, role){
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/sign-up`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'fullName': fullName,
                'email': email,
                'password': password,
                'role': role
            })
        })
        .then(handleResponse)
        .then(
            res => {
                console.log(res);
                dispatch(alertActions.success(res.message));
                history.push('/login');
    
            }
        ).catch(error => {
            console.log(error);
            dispatch(alertActions.error(error));
            history.push('/sign-up');
        });
    }
}





function sendCodeActivatedAccountByEmail(email){
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/send-code-activated-account-by-email`, {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        })
        .then(res => {
            res.json().then(message => {
                alert(message);
            })
        })
    }
}

function activatedAccount(email, code){
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/activated-account`, {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({
                email,
                code
            })
        })
        .then(res => {
            res.json().then(message => {
                alert(message);
                if(res.status === 400){
                    history.push('/activated-account');
                }
                else{
                    history.push('/login');
                }
            })
        })
    }
}

function signUp_Login_With_Google_Facebook(fullName, email, password, userImg, typeAccount){
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/check-to-signup-or-login`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'fullName': fullName,
                'email': email,
                'password': password,
                'userImg': userImg,
                'typeAccount': typeAccount
            })
        })
        .then(handleResponse)
        .then(res => {
            localStorage.setItem('data', JSON.stringify(res));
            if(res.user.role === ''){
                dispatch(updateResOfNavigation(res));
                history.push('/setting-role');
            }
            else{
                history.push('/')
                dispatch(updateResOfNavigation(res));
            }

        })
        .catch(error => {
            dispatch(alertActions.error(error.message));
        });
        
    }
    function updateResOfNavigation(data) { return { type: 'LOGIN_SUCCESS', data: data } }
}

function login(email, password, rememberUsername){
    function request() { 
        return { 
            type: 'LOGIN_REQUEST' 
        } 
    }
    function isSuccess(data, message){
        return {
            type: 'LOGIN_SUCCESS',
            message,
            data
        }
    }
    function isFail(message){
        return {
            type: 'LOGIN_FAIL',
            message
        }
    }
    return dispatch => {
        dispatch(request());
        if(rememberUsername === true){
            localStorage.setItem('username', email);
        }
        else{
            localStorage.removeItem('username');
        }
        fetch(`${config.apiUrlLocal}/users/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        })
        .then(handleResponse)
        .then(res => {
            localStorage.setItem('data', JSON.stringify(res));
                dispatch(isSuccess(res, "Đăng nhập thành công"));
                dispatch(getProfile());
                history.push('/');

        })
        .catch(error => {
            dispatch(alertActions.error(error.message));
            dispatch(isFail(error.message));
        });
    }
}

function logout(){
    localStorage.removeItem('data');
    return {
        type: 'LOGOUT'
    }
}

function getTeacherAll(){

    function isSuccess(teacherAll){
        return {
            type: 'GET_TEACHER_ALL_SUCCESS',
            teacherAll
        }
    }

    return dispatch=> {
        fetch(`${config.apiUrlLocal}/users/get-teacher-all`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            res.text().then(text => {
                const teacherAll = JSON.parse(text).user;
                if(res.status === 200){
                    dispatch(isSuccess(teacherAll));
                }
            })
        })
        .catch(error => console.log(error));
    }
}

function getTeacherWithAddress(address){
    function isSuccess(teacherAddress){
        return {
            type: 'GET_TEACHER_WITH_ADDRESS',
            teacherAddress
        }
    }
    return dispatch => {
        fetch('http://localhost:3001/users/get-teacher-with-address',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                address
            })
        })
        .then(res => {
            res.text().then(text => {
                if(res.status === 200){
                    const teacherAddress = JSON.parse(text).user;
                    console.log(teacherAddress)
                    dispatch(isSuccess(teacherAddress))
                }
            })
        })
        .catch(error => console.log(error))
    }
}

function getTeacherWithSalary(salary){
    function isSuccess(teacherSalary){
        return {
            type: 'GET_TEACHER_WITH_SALARY',
            teacherSalary
        }
    }
    return dispatch => {
        fetch('http://localhost:3001/users/get-teacher-with-salary',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                salary
            })
        })
        .then(res => {
            res.text().then(text => {
                if(res.status === 200){
                    const teacherSalary = JSON.parse(text).user;
                    dispatch(isSuccess(teacherSalary))
                }
            })
        })
        .catch(error => console.log(error))
    }
}

function getTeacherWithSkill(skill){
    function isSuccess(teacherSkill){
        return {
            type: 'GET_TEACHER_WITH_SKILL',
            teacherSkill
        }
    }
    return dispatch => {
        fetch('http://localhost:3001/users/get-teacher-with-skill',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                skill
            })
        })
        .then(res => {
            res.text().then(text => {
                if(res.status === 200){
                    const teacherSkill = JSON.parse(text).user;
                    dispatch(isSuccess(teacherSkill))
                }
            })
        })
        .catch(error => console.log(error))
    }
}

function authenticationHeader(){
    const data = JSON.parse(localStorage.getItem('data'));
    if(data){
        const token = data.token;
        if(token){
            return {
                'Authorization': `Bearer ${token}`
            };
        }
    }
    return null;
}

function getProfile(){
    function isSuccess(userProfile){
        return{
            type: 'GET_PROFILE_SUCCESS',
            userProfile
        }
    }
    return dispatch=>{
        fetch(`${config.apiUrlLocal}/users/get-profile`, {
            method: 'GET',
            headers: authenticationHeader()
        })
        .then(res => {
            res.text().then(text => {
                if(res.status === 200){
                    const userProfile = JSON.parse(text);
                    dispatch(isSuccess(userProfile));
                }
            })
        })
    }
}

function updateInfo(newUser){
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/update-info`,{
            method: 'PUT',
            headers: {
                ...authHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                newUser
            })
        })
        .then(handleResponse)
        .then(
            res => {
                const data = JSON.parse(localStorage.getItem('data'));
                localStorage.removeItem('data');
                const {fullName, address, phoneNumber, salary, discribe, skills, userImg} = newUser;
                data.user = {...data.user, fullName, address, phoneNumber, salary, discribe, skills, userImg}
                localStorage.setItem('data', JSON.stringify(data));
                dispatch(updateResOfNavigation(data));
                dispatch(alertActions.success(res.message));
            },
            error => {
                dispatch(alertActions.error(error));
            })
        .catch(errors => console.log(errors))
    };
    function updateResOfNavigation(data) { return { type: 'LOGIN_SUCCESS', data: data } }
}

function updateRole(role){
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/update-role`,{
            method: 'PUT',
            headers: {
                ...authHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                role
            })
        })
        .then(handleResponse)
        .then(
            res => {
                const data = JSON.parse(localStorage.getItem('data'));
                localStorage.removeItem('data');
                data.user = {...data.user, role}
                localStorage.setItem('data', JSON.stringify(data));
                dispatch(updateResOfNavigation(data));
                dispatch(alertActions.success(res.message));
                history.push('/');
            },
            error => {
                dispatch(alertActions.error(error));
            })
        .catch(errors => console.log(errors))
    };
    function updateResOfNavigation(data) { return { type: 'LOGIN_SUCCESS', data: data } }
}

function changePassword(oldPassword, newPassword, confirmPassword){
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/change-password`,{
            method: 'PUT',
            headers: {
                ...authHeader(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                oldPassword, 
                newPassword, 
                confirmPassword
            })
        })
        .then(handleResponse)
        .then(
            res => {
                dispatch(alertActions.success(res.message));
                history.push('/');
            },
            error => {
                dispatch(alertActions.error(error));
            })
        .catch(errors => console.log(errors))
    };
}

function addSkill(userEmail, skill){
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/add-skill`, {
            method: 'POST',
            headers: {
                'Accept': 'Application/json',
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                userEmail,
                skill
            })
        })
        .then(res => {
            if(res.status === 200){
                history.push('/')
            }
        })
    }
}

function deleteSkill(userEmail, skillItem){
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/delete-skill`, {
            method: 'POST',
            headers: {
                'Accept': 'Application/json',
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                userEmail,
                skillItem
            })
        })
        .then(res => {
            res.text().then(text => {
                history.push('/')
            })
        })
        .catch(error => console.log(error))
    }
}
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

function addNewCourse(newCourse, ownerCourse){
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/add-new-course`, {
            method: 'POST',
            headers: {
                'Accept': 'Application/json',
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                newCourse,
                ownerCourse
            })
        })
        .then(res => {
            res.text().then(text => {
                history.push('/')
            })
        })
        .catch(error => console.log(error))
    }
}

function teacherGetAllCoursesNoRequest(teacher){

    function isSuccess(courses){
        return {
            type: 'TEACHER_GET_ALL_COURSES_NO_REQUEST',
            courses
        }
    }

    return dispatch=> {
        fetch(`${config.apiUrlLocal}/users/teacher-get-all-courses-no-request`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                teacher
            })
        })
        .then(res => {
            res.text().then(text => {
                if(text){
                    const courses = JSON.parse(text);
                    if(res.status === 200){
                        dispatch(isSuccess(courses));
                    }
                }
                
            })
        })
        .catch(error => console.log(error));
    }
}

function teacherRequestingReceivedTeachCourse(idCourse, requestor, requestedPersonTemp){
    const requestedPerson = {
        email:  requestedPersonTemp.emailOwner,
        fullName: requestedPersonTemp.fullNameOwner,
        phoneNumber: requestedPersonTemp.phoneNumberOwner
    }
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/teacher-requesting-received-teach-course`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idCourse,
                requestor,
                requestedPerson
            })
        })
        .then(res => {
            res.json().then(message=>  {
                alert(message);
            })
        })
    }
}

function teacherGetAllCoursesRequestingTeach(teacher){
    function isGot(courses){
        return {
            type: 'TEACHER_GET_ALL_COURSES_REQUESTING_TEACH',
            courses
        }
    }
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/teacher-get-all-courses-requesting-teach`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ teacher })
        })
        .then(res => {
            res.json().then(courses => {
                dispatch(isGot(courses))
            })
        })
    }
}

function teacherGetAllCoursesRequestingReceivedTeach(teacher){
    function isGot(courses){
        return {
            type: 'TEACHER_GET_ALL_COURSES_REQUESTING_RECEIVED_TEACH',
            courses
        }
    }
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/teacher-get-all-courses-requesting-received-teach`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ teacher })
        })
        .then(res => {
            res.json().then(courses => {
                dispatch(isGot(courses))
            })
        })
    }
}

function teacherCancelRequestingReceivedTeach(idCourse){
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/teacher-cancel-requesting-received-teach`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({idCourse})
        })
        .then(res => {
            res.json().then(message => {
                alert(message);
                history.push('/');
            })
        })
    }
}

function studentGetAllCoursesRequestingReceivedTeach(student){
    function isGot(courses){
        return {
            type: 'STUDENT_GET_ALL_COURSES_REQUESTING_RECEIVED_TEACH',
            courses
        }
    }
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/student-get-all-courses-requesting-received-teach`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({student})
        })
        .then(res => {
            res.json().then(courses => {
                dispatch(isGot(courses));
            })
        })
    }
}

function studentGetAllCoursesNoReceived(requestor){
    function isGot(courses){
        return {
            type: 'STUDENT_GET_ALL_COURSES_NO_RECEIVED',
            courses
        }
    }
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/student-get-all-courses-no-received`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                requestor
            })
        })
        .then(res => {
            res.json().then(courses => {
                dispatch(isGot(courses));
            })
        })
    }
}

function studentRequestingTeachCourse(idCourse, student, teacher){
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/student-requesting-teach-course`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idCourse,
                student,
                teacher
            })
        })
        .then(res => {
            res.json().then(message=>  {
                alert(message);
            })
        })
    }
}

const userActions = {
    signUp,
    login,
    logout,
    getProfile,
    getTeacherAll,
    getTeacherWithAddress,
    getTeacherWithSalary,
    getTeacherWithSkill,
    signUp_Login_With_Google_Facebook,
    sendCodeActivatedAccountByEmail,
    activatedAccount,
    addNewCourse,

    teacherGetAllCoursesNoRequest,
    teacherRequestingReceivedTeachCourse,
    teacherGetAllCoursesRequestingTeach,
    teacherGetAllCoursesRequestingReceivedTeach,
    teacherCancelRequestingReceivedTeach,

    studentGetAllCoursesRequestingReceivedTeach,
    studentGetAllCoursesNoReceived,
    studentRequestingTeachCourse,

    updateInfo,
    updateRole,
    changePassword

};

export default userActions;