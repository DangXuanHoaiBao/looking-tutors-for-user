import history from '../helpers/history';

function sendInforToFormSignUp(fullName, email){
    return { 
            type: 'SEND_INFOR_TO_FORM_SIGN_UP',
            fullName,
            email
        }
};

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
        fetch('http://localhost:3001/users/sign-up',{
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
        fetch('http://localhost:3001/users/login', {
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
                    history.push('/teacher');
                }
            })
        })
        .catch(error => console.log(error));
    }
}

function logout(){
    localStorage.removeItem('data');
    history.push('/')
    return {
        type: 'LOGOUT'
    }
}

function getTeacherAll(){

    function isSuccess(users){
        return {
            type: 'GET_TEACHER_ALL_SUCCESS',
            users
        }
    }

    return dispatch=> {
        fetch('http://localhost:3001/users/get-teacher-all', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            res.text().then(text => {
                const users = JSON.parse(text).user;
                if(res.status === 200){
                    dispatch(isSuccess(users));
                }
            })
        })
        .catch(error => console.log(error));
    }
}

function authenticationHeader(){
    const data = JSON.parse(localStorage.getItem('data'));
    const token = JSON.parse(data).token;
    if(token){
        return {
            'Authorization': `Bearer ${token}`
        };
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
        fetch('http://localhost:3001/users/get-profile', {
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
        fetch('http://localhost:3001/users/update-profile',{
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
            console.log(res);
            res.text().then(text => {
                if(res.status === 200){
                    dispatch(logout());
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
        fetch('http://localhost:3001/users/add-skill', {
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
                history.push('/teacher')
            })
        })
    }
}

function deleteSkill(userEmail, skillItem){
    return dispatch => {
        fetch('http://localhost:3001/users/delete-skill', {
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
                history.push('/teacher')
            })
        })
        .catch(error => console.log(error))
    }
}

const userActions = {
    sendInforToFormSignUp,
    signUp,
    login,
    logout,
    getProfile,
    updateProfile,
    getTeacherAll,
    deleteSkill,
    addSkill
};

export default userActions;