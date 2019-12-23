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
                    history.push('/login');
                }
            });
        })
    }
}

function signUp_Login_With_Google_Facebook(fullName, email, password, userImg, typeAccount){
    // function isSuccess(data, message){
    //     return {
    //         type: 'SUCCESS_WITH_GOOGLE_FACEBOOK',
    //         message,
    //         data
    //     }
    // }
    // function isFail(data, message){
    //     return {
    //         type: 'FAIL_WITH_GOOGLE_FACEBOOK',
    //         message,
    //         data
    //     }
    // }
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
        .then(res => {
                res.text().then(text => {
                    const messageJson = JSON.parse(text).message;
                    const message = messageJson.message;
                if(res.status === 400){
                    dispatch(isFail(message));
                    history.push('/login');
                }
                else{
                    const data = JSON.parse(text);
                    localStorage.setItem('data', JSON.stringify(data));
                    dispatch(isSuccess(data, message));
                    dispatch(getProfile());
                    history.push('/');
                }
            })
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
    function isSuccess(message){
        return {
            type: 'ADD_SKILL_SUCCESS',
            message
        }
    }
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
            res.text().then(text => {
                const message = JSON.parse(text);
                dispatch(isSuccess(message));
                history.push('/')
            })
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
    signUp_Login_With_Google_Facebook
};

export default userActions;