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
    function isSuccess(user, message){
        return {
            type: 'LOGIN_SUCCESS',
            user,
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
                    const user = userInfo.fullName;
                    localStorage.setItem('user', user);
                    dispatch(isSuccess(user, message));
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

const userActions = {
    sendInforToFormSignUp,
    signUp,
    login,
    logout
};

export default userActions;