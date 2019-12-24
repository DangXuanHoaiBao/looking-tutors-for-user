/* eslint-disable no-restricted-globals */
import history from '../helpers/history';
import config from '../config/api-config';

function signUp(fullName, email, password, role){
    function isSuccess(message){
        return {
            type: 'SIGN_UP_SUCCESS',
            message
        }
    }
    function isFail(message){
        return {
            type: 'SIGN_UP_FAIL',
            message
        }
    }
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
        .then(res => {
            res.text().then(text => {
                const message = JSON.parse(text).message;
                if(res.status === 400){
                    dispatch(isFail(message));
                    history.push('/sign-up');
                }
                else{
                    dispatch(isSuccess(message))
                    history.push('/activated-account', email);
                }
            });
        })
    }
}

function sendCodeActivatedAccountByEmail(email){
    function isFail(message){
        return {
            type: 'SEND_CODE_ACTIVATED_ACCOUNT_BY_EMAIL_FAIL',
            message
        }
    }
    function isSuccess(message){
        return {
            type: 'SEND_CODE_ACTIVATED_ACCOUNT_BY_EMAIL_SUCCESS',
            message
        }
    }
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
            res.text().then(text => {
                const message = JSON.parse(text).message;
                console.log(message);
                if(res.status === 200){
                    dispatch(isFail(message));
                }
                else{
                    dispatch(isSuccess(message));
                }
            })
        })
    }
}

function activatedAccount(email, code){
    function isFail(message){
        return {
            type: 'ACTIVATED_ACCOUNT_FAIL',
            message
        }
    }
    function isSuccess(message){
        return {
            type: 'ACTIVATED_ACCOUNT_SUCCESS',
            message
        }
    }
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
            res.text().then(text => {
                const message = JSON.parse(text);
                if(res.status === 400){
                    dispatch(isFail(message))
                    history.push('/activated-account');
                }
                else{
                    dispatch(isSuccess(message));
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
        .then(res => {
            res.text().then(text => {
                if(res.status === 400){
                    history.push('/login');
                }
                else{
                    const data = JSON.parse(text);
                    localStorage.setItem('data', JSON.stringify(data));
                    dispatch(getProfile());
                    console.log('Phân quyền: ' + data.user.role);
                    if(data.user.role === ''){
                        history.push('/set-role');
                    }
                    else{
                        history.push('/')
                    }
                }
            })
        })
        .catch(error => console.log(error));
    }
}

function login(email, password){
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
            const message = res.message;
            if(res.status === 400){
                dispatch(isFail(message));
                history.push('/login');
            }
            else{
                localStorage.setItem('data', JSON.stringify(res));
                dispatch(isSuccess(res, message));
                dispatch(getProfile());
                history.push('/');
            }
        })
        .catch(error => console.log(error));
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

function updateProfile(oldEmail, newUser){
    return dispatch => {
        fetch(`${config.apiUrlLocal}/users/update-profile`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify ({
                oldEmail,
                newUser
            })
        })
        .then(res => {
            res.text().then(text => {
                if(res.status === 200){
                    dispatch(logout());
                    history.push('/');
                }
            })
        })
        .catch(errors => console.log(errors))
    }
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

function getAllCourses(){

    function isSuccess(allCourses){
        return {
            type: 'GET_ALL_COURSES_SUCCESS',
            allCourses
        }
    }

    return dispatch=> {
        fetch(`${config.apiUrlLocal}/users/get-all-courses`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            res.text().then(text => {
                const allCourses = JSON.parse(text);
                if(res.status === 200){
                    dispatch(isSuccess(allCourses));
                }
            })
        })
        .catch(error => console.log(error));
    }
}

const userActions = {
    signUp,
    login,
    logout,
    getProfile,
    updateProfile,
    getTeacherAll,
    getTeacherWithAddress,
    getTeacherWithSalary,
    getTeacherWithSkill,
    deleteSkill,
    addSkill,
    signUp_Login_With_Google_Facebook,
    sendCodeActivatedAccountByEmail,
    activatedAccount,
    addNewCourse,
    getAllCourses
};

export default userActions;