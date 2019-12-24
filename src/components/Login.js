import React from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import{ToastContainer} from 'react-toastify';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFan } from '@fortawesome/free-solid-svg-icons';
import userActions from '../actions/user';
import {connect} from 'react-redux';
import firebase from 'firebase';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {
                email: '',
                password: ''
            },
            isLogining: false,
            rememberUsername: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLoginWithFacebook = this.handleLoginWithFacebook.bind(this);
        this.handleLoginWithGoogle = this.handleLoginWithGoogle.bind(this);
    }
    UNSAFE_componentWillMount(){
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            console.log("Đã thoát");
          }).catch(function(error) {
            // An error happened.
          });
          const username = localStorage.getItem('username');
          if(username){
              this.setState({email: username, rememberUsername: true});
          }
    }

    handleChange(e){
        const {name } = e.target;
        let errors = {
            email: '',
            password: ''
        }
        let {value} = e.target;
        if(name === 'rememberUsername'){
            value = e.target.checked
        }
        if(name === 'email'){
            errors.email = (value.length < 1 || value[0] === ' ') ? 'email không hợp lệ': '';
        }
        if(name === 'password'){
            errors.password = (value.length < 1 || value[0] === ' ') ? 'password không hợp lệ': '';
        }
        this.setState({
            [name]: value,
            errors
        });
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({isLogining: true});
        const {email, password, errors, rememberUsername} = this.state;
        const {login} = this.props;
        if(errors.email === '' && errors.password === '' && email.length > 0 && password.length > 0){
            login(email, password, rememberUsername);
        }
    }

    handleLoginWithFacebook(){
        const provider = new firebase.auth.FacebookAuthProvider();
        const { signUp_Login_With_Google_Facebook } = this.props;
        firebase.auth().languageCode = 'fr_FR';
        provider.setCustomParameters({
            'display': 'popup'
        });
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            if(user){
                signUp_Login_With_Google_Facebook(user.displayName, user.email, '', user.photoURL, 'Facebook')
                console.log("Đã đăng nhập");

            }
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            // ...
            console.log( errorMessage);
          });

    }

    handleLoginWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();
        const { signUp_Login_With_Google_Facebook } = this.props;
        provider.addScope = 'https://www.googleapis.com/auth/admin.directory.userschema.readonly';
        firebase.auth().languageCode = 'pt';
        provider.setCustomParameters({
            'login_hint': 'user@example.com'
        });
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(token);
            console.log(user);
            if(user){
                console.log(user);
                signUp_Login_With_Google_Facebook(user.displayName, user.email, '', user.photoURL, 'Google')
                console.log("Đã đăng nhập");
            }
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            console.log(errorCode, errorMessage, email, credential);
            // ...
          });
          

    }

    render(){

        const {errors, email, password, rememberUsername} = this.state;
        const {message, isLogining} = this.props;
        let errorMessageLogin = false;
        return (
            <div className="container form-margin-top">
                {errorMessageLogin ? 
                    <Alert variant='danger' className="mt-3">
                        {message}
                    </Alert>
                    :
                    null
                }
                <div className="row justify-content-center mt-4 mb-4" >
                    <div className='col-md-6 border border-dark shadow rounded'>
                        <div className="row justify-content-center">
                            <div className="col-md-8 mt-5 mb-5">
                                <h3 className="mb-3">Đăng Nhập Tài Khoản</h3>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Nhập email" name="email" value={email} onChange={this.handleChange} required/>
                                        {errors.email ? <Form.Text className="text-danger">{errors.email}</Form.Text> : null}
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Mật Khẩu</Form.Label>
                                        <Form.Control type="password" placeholder="Nhập mật khẩu" name="password" value={password} onChange={this.handleChange} required/>
                                        {errors.password ? <Form.Text className="text-danger">{errors.password}</Form.Text> : null}
                                    </Form.Group>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" name="rememberUsername"  label="Nhớ tài khoản" checked={rememberUsername} onChange={this.handleChange}/>
                                    </Form.Group>
                                    <Button className="w-100" variant="primary" type="submit">
                                        Đăng Nhập
                                        {isLogining === true &&
                                            <FontAwesomeIcon className="ml-2 opacity-8" icon={faFan} spin/>
                                        }
                                    </Button>
                                    <Button className="loginBtn loginBtn--facebook w-100" onClick={this.handleLoginWithFacebook}>
                                        Đăng nhập với Facebook
                                    </Button>
                                    <Button className="loginBtn loginBtn--google w-100" onClick={this.handleLoginWithGoogle}>
                                        Đăng nhập với Google
                                    </Button>
                                </Form>
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    message: state.login.message,
    isLogining: state.login.isLogining
});
const actionCreator = {
    login: userActions.login,
    signUp_Login_With_Google_Facebook: userActions.signUp_Login_With_Google_Facebook
}
export default connect(mapStateToProps, actionCreator)(Login);