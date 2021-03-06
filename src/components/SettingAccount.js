import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import { ToastContainer } from 'react-toastify';
import userActions from '../actions/user';
import history from '../helpers/history';

class SettingAccount extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            password: '',
            passwordConfirm: '',
            isCheckTeacher: true,
            isCheckRenter: false,
            errors: {
                password: '',
                passwordConfirm: ''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
    }

    handleChange(e){
        const {name, value} = e.target;
        let errors = {
            password: '',
            passwordConfirm: ''
        }
        if(name === 'password'){
            errors.password = (value.length < 1 || value[0] === ' ') ? 'Mật khẩu không hợp lệ' : ''
        }
        if(name === 'passwordConfirm'){
            errors.passwordConfirm = (value.length < 1 || value[0] === ' ') ? 'Mật khẩu xác nhận không hợp lệ' : ''
        }
        this.setState({
            [name]: value,
            errors
        })
    }

    onCheckChange(e){
        if(e.target.name === "isCheckTeacher"){
            this.setState({
                isCheckTeacher: e.target.checked,
                isCheckRenter: !e.target.checked
            });
        }
        else{
            this.setState({
                isCheckTeacher: !e.target.checked,
                isCheckRenter: e.target.checked
            });
        }

    }

    handleSubmit(e){
        e.preventDefault();
        const {password, passwordConfirm, errors, isCheckTeacher} = this.state;
        const {signUp} = this.props;
        const userAccount = history.location.state;
        if(password !== passwordConfirm){
            this.setState({
                errors: {
                    passwordConfirm: 'Xác nhận mật khẩu không đúng'
                }
            })
        }
        else{
            if(errors.password === '' && errors.passwordConfirm === '' && password.length !== 0 && passwordConfirm.length !== 0){
                const role = isCheckTeacher ? 'teacher' : 'renter';
                signUp(userAccount.fullName, userAccount.email, password, role);
            }
        }
    }

    render(){
        
        const {password, passwordConfirm, isCheckTeacher, isCheckRenter, errors} = this.state;
        const {messageFail, messageSuccess} = this.props;
        if(messageFail){
            alert(messageFail);
        }
        if(messageSuccess){
            alert(messageSuccess)
        }
        return (
            <div>
                <div className="container form-margin-top margin-bottom-10em">
                    <div className="row justify-content-center mt-4 mb-4" >
                        <div className='col-md-6 border border-dark shadow rounded'>
                            <div className="row justify-content-center">
                                <div className="col-md-8 mt-5 mb-5">
                                    <h3 className="mb-3">Thiết Lập Tài Khoản</h3>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Group controlId="formBasicPassword">
                                            <Form.Label>Mật khẩu</Form.Label>
                                            <Form.Control type="password" placeholder="Nhập mật khẩu" name="password" value={password} onChange={this.handleChange} required/>
                                           
                                        </Form.Group>

                                        <Form.Group controlId="formBasicPasswordConfirm">
                                            <Form.Label>Xác nhận mật khẩu</Form.Label>
                                            <Form.Control type="password" placeholder="Nhập mật khẩu xác nhận" name="passwordConfirm" value={passwordConfirm} onChange={this.handleChange} required/>
                                            {errors.passwordConfirm ? <Form.Text className="text-danger">{errors.passwordConfirm}</Form.Text> : null}
                                        </Form.Group>

                                        <div>Tôi muốn đăng ký tài khoản với vai trò</div>
                                        <p/>
                                        <div className="row justify-content-center">
                                            <div className="checkbox mr-5">
                                                <input type="checkbox" name="isCheckTeacher" checked={isCheckTeacher} onChange={this.onCheckChange}/>
                                                <label className="ml-1" for="checkbox"><span>Người dạy</span></label>
                                            </div>
                                            <div className="checkbox">
                                                <input type="checkbox" name="isCheckRenter" checked={isCheckRenter} onChange={this.onCheckChange}/>
                                                <label className="ml-1" for="checkbox"><span>Người thuê</span></label>
                                            </div>

                                        </div>
                                        <div className="border-bottom border-primary" />
                                        <br/>
                                        <Button className="w-100" variant="primary" type="submit">
                                            Đăng Ký
                                        </Button>
                                    </Form>
            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const actionCreator = {
    signUp: userActions.signUp
}

export default connect(null, actionCreator)(SettingAccount);