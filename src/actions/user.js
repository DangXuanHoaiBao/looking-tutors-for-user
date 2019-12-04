
function signUp(fullName, email){
    return { 
            type: 'SIGN_UP',
            fullName,
            email
        }
};

function settingAccount(fullName, email, password, role){
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
            console.log(res);
        })
    }
}

const userActions = {
    signUp,
    settingAccount
};

export default userActions;