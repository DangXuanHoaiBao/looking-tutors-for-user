/* eslint-disable func-names */
/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/prefer-stateless-function */
import React, { Fragment } from "react";
import {connect} from 'react-redux';
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button
} from "reactstrap";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFan } from '@fortawesome/free-solid-svg-icons';
import userAction from "../actions/user";
import { ToastContainer } from "react-toastify";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notify1: false,
      notify2: false,
      notify3: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      isChanging: false,
      contentNotify: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }


  handleSubmit(e) {
      e.preventDefault();
      const { oldPassword, newPassword, confirmPassword } = this.state
      const { changePasswordProp } = this.props;

      if(oldPassword === ''){
        this.setState({ notify1: true });
      }
      else{
        this.setState({ notify1: false });
      }
      if(newPassword === '' || newPassword.length < 8){
        if(newPassword === ''){
          this.setState({ contentNotify: 'Vui lòng điền mật khẩu mới'});
        }
        if(newPassword.length < 8){
          this.setState({ contentNotify: 'Mật khẩu phải phải ít nhất 8 ký tự'});
        }

        this.setState({ notify2: true});
      }
      else{
        this.setState({ notify2: false });
      }

      if(confirmPassword !== newPassword){
        this.setState({ notify3: true });
      }
      else{
        this.setState({ notify3: false });
      }

      
      if(oldPassword !== '' && newPassword !== '' && newPassword === confirmPassword && newPassword.length >= 8){
        changePasswordProp(oldPassword, newPassword, confirmPassword);
      }
  }   




  render() {
    const span = <span style={{ color: "red" }}>(*)</span>;
    const { notify1, notify2, notify3, oldPassword, newPassword, confirmPassword, isChanging, contentNotify } = this.state;
    return (
      <div className="container form-margin-top margin-bottom-10em">
        <Row>
          <Col md="3" />
          <Col md="6" className="content-info"><h2>Đổi mật khẩu</h2></Col>
          <Col md="3" />
        </Row>
        <Row >
          <Col md="3" />
          <Col md="6">
            <Card className="main-card mb-3">
                
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="exampleEmail">Mật khẩu cũ</Label>
                    <Input invalid={notify1} name="oldPassword" value={oldPassword} type="password" onChange={this.handleChange}/>
                    <FormFeedback>Vui lòng điền mật khẩu cũ</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Mật khẩu mới {span}</Label>
                    <Input invalid={notify2} name="newPassword" value={newPassword} type="password" onChange={this.handleChange}/>
                    <FormFeedback>{contentNotify}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                     <Label for="exampleEmail">Xác nhận mật khẩu</Label>
                    <Input  invalid={notify3} name="confirmPassword" value={confirmPassword} type="password" onChange={this.handleChange} />
                    <FormFeedback>Xác nhận mật khẩu không đúng</FormFeedback>
                  </FormGroup>
                  <Label>{span}: Mật khẩu phải ít nhất 8 ký tự</Label>
                  <Button className="float-right btn-upload">Đồng ý
                  {isChanging &&
                    <FontAwesomeIcon className="ml-2 opacity-8" icon={faFan} spin/>
                  }
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="3" />
        </Row>
        <ToastContainer />
      </div>
    );
  }
}

const actionCreator = {
    changePasswordProp: userAction.changePassword
}
export default connect(null, actionCreator)(ChangePassword);
