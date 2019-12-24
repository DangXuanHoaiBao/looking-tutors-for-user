/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/prefer-stateless-function */
import React, { Fragment } from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Button,
  Media
} from "reactstrap";
import { toast, Bounce } from 'react-toastify';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFan } from '@fortawesome/free-solid-svg-icons';
import PageTitle from "../../PageTitle";
import userAction from "../../../actions/user-action";
import profileImg from "../../../asset/images/profile.png"
import storage from "../../../config/firebase-config";

class FormInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      code: '',
      username: '',
      role: '',
      notify: false,
      selectdImage: null,
      reviewImage: null,
      urlAvatar: '',
      progress: 0,
      isUploading: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectImage = this.handleSelectImage.bind(this);
  }

  UNSAFE_componentWillMount(){
    const {res} = this.props;
    this.setState({
      fullName: res.manager.fullName,
      code: res.manager.code,
      username: res.manager.username,
      role: res.manager.role,
      urlAvatar: res.manager.urlAvatar,

    });
  }
  
  UNSAFE_componentWillReceiveProps(newProp){
    const { info } = newProp;
    if(info){
      this.setState({
        fullName: info.fullName,
        code: info.code,
        username: info.username,
        role: info.role
      });
    }
  }

  notify = () => {
    this.toastId = toast("Định dạng file không hợp lệ", {
    transition: Bounce,
    closeButton: true,
    autoClose: 3000,
    position: 'top-center',
    type: 'error',
    newestOnTop: true   
  })};



  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    if(value === ''){
      this.setState({ notify: true });
    }
    else {
      this.setState({ notify: false });
    }
  }

  handleSelectImage(e){
    const Img = e.target.files[0]
    if(Img !== undefined){
      if(Img.type.includes('image') !== true){
        this.setState({
          selectdImage: Img
        });
        this.notify();
        return;
      }
      this.setState({
        reviewImage: URL.createObjectURL(Img),
        selectdImage: Img
      });
    }
   
  }

  handleSubmit(e) {
      e.preventDefault(); 
      const { updateInfoProp } = this.props;
      const { fullName, username, selectdImage } = this.state;
      this.setState({ isUploading: true });

      if(selectdImage === null){
        updateInfoProp(fullName, '');
        this.setState({ isUploading: false });
      }
      else{
        if(selectdImage.type.includes('image') !== true){
          this.notify();
          updateInfoProp(fullName, '');
          this.setState({ isUploading: false });
          return;
        }
        const uploadTask = storage.ref(`avatars/${username}/${selectdImage.name}`).put(selectdImage);
        uploadTask.on(
          "state_changed",
          function(snapshot) {
            // progress function ...
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            this.setState({ progress });
          }.bind(this),
          function(error) {
            // Error function ...
            console.log(error);
          },
          function() {
            // complete function ...
            uploadTask.snapshot.ref.getDownloadURL()
            .then(function(url){
              updateInfoProp(fullName, url);
              this.setState({ urlAvatar: url,
                              isUploading: false});
            }.bind(this))
          }.bind(this)
        );
      }
      
  }   




  render() {
    const { fullName, code, username, role, notify, reviewImage, isUploading} = this.state;
    let { urlAvatar } = this.state;
    const span = <span style={{ color: "red" }}>(*)</span>;
    if(reviewImage !== null){
      urlAvatar = reviewImage;
    }
    return (
      <Fragment>
        <PageTitle
          heading="Thông tin tài khoản"
          subheading="Bạn có thể cập nhật họ tên và ảnh đại diện phía dưới"
          icon="pe-7s-info icon-gradient bg-sunny-morning"
        />
       
        <Row>
          <Col md="3" />
          <Col md="6">
            <Card className="main-card mb-3">
                <Row className="custom-image-info">
                  <Col xs={12} >
                    {reviewImage !== null &&
                      <Media object  width={100}
                      height={100}
                      src={reviewImage} className="rounded-circle"/>
                    }
                    {reviewImage === null && urlAvatar !== '' &&
                      <Media object  width={100}
                      height={100}
                      src={urlAvatar} className="rounded-circle"/>
                    }
                    {reviewImage === null && urlAvatar === '' &&
                      <Media object  width={100}
                      height={100}
                      src={profileImg} className="rounded-circle"/>
                    }
                  </Col>
                </Row>
                <Row className="custom-image-info">
                  <Col xs={12}>
                  <div className="custom-form-file-group">
                      <Button className="btn-upload">Cập nhật ảnh</Button>
                      <input type="file" id="fileup" accept="image/*" onChange={this.handleSelectImage} />
                  </div>
                  </Col>
                </Row>
              <CardBody>
                <CardTitle>Thông tin cá nhân</CardTitle>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="exampleEmail">Họ tên</Label>
                    <Input invalid={notify} name="fullName" value={fullName} type="text" onChange={this.handleChange}/>
                    <FormFeedback>Tên không được bỏ trống!!!</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Mã số {span}</Label>
                    <Input name="fullName" value={code} type="text"  disabled />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Tài khoản {span}</Label>
                    <Input name="fullName" value={username} type="text" disabled />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Chức vụ {span}</Label>
                    <Input name="fullName" value={role} type="text" disabled  />
                  </FormGroup>
                  <Label>{span}: Chỉ xem</Label>
                  <Button className="float-right btn-update">Cập nhật
                  {isUploading &&
                    <FontAwesomeIcon className="ml-2 opacity-8" icon={faFan} spin/>
                  }
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col md="3" />
        </Row>
      </Fragment>
    );
  }
}
const mapStateToProp = state => {
  const { res } =  state.authentication;
  return { res }

};

const mapDisPatchToProps = dispatch => {
  return bindActionCreators({
      updateInfoProp: userAction.updateInfo
  }, dispatch);
}
export default connect(mapStateToProp, mapDisPatchToProps)(FormInfo);
