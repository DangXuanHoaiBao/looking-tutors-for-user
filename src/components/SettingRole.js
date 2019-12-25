import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import userActions from '../actions/user';
import history from '../helpers/history';

class SettingAccount extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isCheckTeacher: true,
            isCheckRenter: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onCheckChange = this.onCheckChange.bind(this);
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
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
        const {isCheckTeacher} = this.state;
        const {updateRole} = this.props;
        const role = isCheckTeacher ? 'teacher' : 'renter';
        updateRole(role);
    }

    render(){
        
        const {isCheckTeacher, isCheckRenter} = this.state;
        return (
            <div>
                <div className="container form-margin-top margin-bottom-10em">
                    <div className="row justify-content-center mt-4 mb-4" >
                        <div className='col-md-6 border border-dark shadow rounded'>
                            <div className="row justify-content-center">
                                <div className="col-md-8 mt-5 mb-5">
                                    <h3 className="mb-3">Thiết Lập Tài Khoản</h3>
                                    <Form onSubmit={this.handleSubmit}>
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
                                            Đồng ý
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
    updateRole: userActions.updateRole
}

export default connect(null, actionCreator)(SettingAccount);