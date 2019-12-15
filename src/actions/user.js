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
                    const data = JSON.parse(text)
                    const token = data.token;
                    localStorage.setItem('token', token);
                    dispatch(isSuccess(data, message));
                    history.push('/');
                }
            })
        })
        .catch(error => console.log(error));
    }
}

function logout(){
    localStorage.removeItem('user');
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
    const token = localStorage.getItem('token');
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
        fetch('http://localhost:3001/users/profile', {
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

const userActions = {
    sendInforToFormSignUp,
    signUp,
    login,
    logout,
    getProfile,
    getTeacherAll
};

export default userActions;