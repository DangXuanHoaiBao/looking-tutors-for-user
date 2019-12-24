import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import history from '../helpers/history';
import userActions from '../actions/user';

class ActivatedAccount extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            code: '',
            errorCode: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e){
        if(e.target.value === ''){
            this.setState({
                errorCode: 'Mã xác nhận trống'
            })
        }
        else{
            this.setState({
                code: e.target.value
            })
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const {code} = this.state;
        const {activatedAccount} = this.props;
        const email = history.location.state;
        console.log(code + " " + email)
        activatedAccount(email, code);
    }

    handleClick(){
        const {sendCodeActivatedAccountByEmail} = this.props;
        const email = history.location.state;
        sendCodeActivatedAccountByEmail(email);
    }

    render(){
        const {code} = this.state;
        const {messageSendCode, messageActivatedAccount} = this.props;
        if(messageActivatedAccount){
            alert(messageActivatedAccount)
        }
        if(messageSendCode){
            alert(messageSendCode);
        }
        return(
            <div className="container ">
                <div className="row justify-content-center mt-4 mb-4" >
                    <div className='col-md-6 border border-dark shadow rounded'>
                        <div className="row justify-content-center">
                            <div className="col-md-8 mt-5 mb-5">
                                <h3 className="mb-3">Kích Hoạt Tài Khoản</h3>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="formCode">
                                        <Form.Label>Mã kích hoạt</Form.Label>
                                        <Form.Control type="text" placeholder="Nhập mã kích hoạt" name="code" value={code} onChange={this.handleChange}/>
                                        <Form.Text className="text-danger"></Form.Text>
                                        <Button onClick={this.handleClick}>Gửi lại mã</Button>
                                    </Form.Group>
                                    <Button className="w-100" variant="primary" type="submit">
                                        Xác Nhận Kích Hoạt
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    messageSendCode: state.sendCodeActivatedAccountByEmail.message,
    messageActivatedAccount: state.activatedAccount.message
})

const actionCreator = {
    sendCodeActivatedAccountByEmail: userActions.sendCodeActivatedAccountByEmail,
    activatedAccount: userActions.activatedAccount
}

export default connect(mapStateToProps, actionCreator)(ActivatedAccount);