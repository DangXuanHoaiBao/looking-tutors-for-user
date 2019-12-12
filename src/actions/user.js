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
    function isSuccess(userInfo, message){
        return {
            type: 'LOGIN_SUCCESS',
            userInfo,
            message
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
                    const userInfo = JSON.parse(text).user;
                    console.log(userInfo.fullName);
                    // const user = userInfo.fullName;
                    localStorage.setItem('userInfo', userInfo);
                    dispatch(isSuccess(userInfo, message));
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
            },
        })
        .then(res => {
            res.text().then(text => {
                const users = JSON.parse(text);
                if(res.status === 200){
                    dispatch(isSuccess(users));
            
                }
            })
        })
        .catch(error => console.log(error));
    }
}

const userActions = {
    sendInforToFormSignUp,
    signUp,
    login,
    logout,
    getTeacherAll
};

export default userActions;