import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import history from '../helpers/history';
import userActions from '../actions/user';
import Header from '../components/Header';
import Footer from '../components/Footer';

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            fullName: '',
            email: '',
            errors: {
                fullName:'',
                email: ''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        const {name, value} = e.target;
        let errors = {
            fullName: '',
            email: ''
        }
        if(name === 'fullName'){
            errors.fullName = (value.length < 1 || value[0] === ' ') ? 'Họ tên không hợp lệ' : ''
        }
        if(name === 'email'){
            errors.email = (value.length < 1 || value[0] === ' ') ? 'Email không hợp lệ' : ''
        }
        this.setState({
            [name]: value,
            errors
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const {fullName, email, errors} = this.state;
        const {sendInforToFormSignUp} = this.props;
        if(errors.fullName === '' && errors.email === '' && fullName.length !== 0 && email.length !== 0){
            sendInforToFormSignUp(fullName, email);
            history.push('/setting-account');
        }
    }

    render(){

        const {fullName, email, errors} = this.state;

        return (
            <div>
                <Header/>
                <div className="container ">
                    <div className="row justify-content-center mt-4 mb-4" >
                        <div className='col-md-6 border border-dark shadow rounded'>
                            <div className="row justify-content-center">
                                <div className="col-md-8 mt-5 mb-5">
                                    <h3 className="mb-3">Đăng Ký Tài Khoản</h3>
                                    <Form onSubmit={this.handleSubmit}>

                                        <Form.Group controlId="formFirstName">
                                            <Form.Label>Họ tên</Form.Label>
                                            <Form.Control type="text" placeholder="Nhập họ tên" name="fullName" value={fullName} onChange={this.handleChange}/>
                                            {errors.fullName ? <Form.Text className="text-danger">{errors.fullName}</Form.Text> : null}
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Nhập email" name="email" value={email} onChange={this.handleChange}/>
                                            {errors.email ? <Form.Text className="text-danger">{errors.email}</Form.Text> : null}
                                        </Form.Group>
                                        <Button className="w-100" variant="primary" type="submit">
                                            Đăng Ký
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    sendInforToFormSignUp: (fullName, email) => { 
        dispatch(userActions.sendInforToFormSignUp(fullName, email));
    }
})

export default connect(null, mapDispatchToProps)(SignUp);