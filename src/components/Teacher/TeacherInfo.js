/* eslint-disable no-console */
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
  Button,
  Media,
} from "reactstrap";
import { toast, Bounce } from 'react-toastify';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faFan } from '@fortawesome/free-solid-svg-icons';
import userActions from "../../actions/user";
import profileImg from "../../images/profile.png"
import { storage } from "../../config/firebase-config";

class Info extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notify1: false,
      notify2: false,
      notify3: false,
      notify4: false,
      notify5: false,
      notify6: false,
      fullNameTemp: '',
      fullName: '',
      email: '',
      address: '',
      phoneNumber: '',
      salary: 0,
      discribe: '',
      arraySkills: [],
      skill: '',
      imgFile: null,
      userImg: '',
      role: '',
      selectdImage: null,
      reviewImage: null,
      progress: 0,
      isUploading: false, 
  
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectImage = this.handleSelectImage.bind(this);
    this.handleAddSkill = this.handleAddSkill.bind(this);
    this.handleDeleteSkill = this.handleDeleteSkill.bind(this);
  }

  UNSAFE_componentWillMount(){
    const {data} = this.props;
    console.log(this.state.userImg);
    this.setState({
      fullNameTemp: data.user.fullName,
      fullName: data.user.fullName,
      email: data.user.email,
      address: data.user.address,
      phoneNumber: data.user.phoneNumber,
      discribe: data.user.discribe,
      arraySkills: data.user.skills,
      userImg: data.user.userImg,
      salary: data.user.salary,
      role: data.user.role
  });
  }
  
  UNSAFE_componentWillReceiveProps(newProp){
    const { info } = newProp;
    if(info){
      this.setState({
        fullName: info.fullName,
        code: info.code,
        email: info.email,
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
    if((name === 'salary' || name === 'phoneNumber') && !Number(value) && value !== ''){
      return;
    }
    this.setState({ [name]: value });
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
      const { updateInfo } = this.props;
      const { fullName, email, selectdImage, address, phoneNumber, arraySkills, salary, discribe, userImg,
      } = this.state;
      this.setState({ isUploading: true });

      if(fullName === ''){
        this.setState({ notify1: true });
      }
      else{
        this.setState({ notify1: false });
      }
      
      if(address === ''){
        this.setState({ notify2: true });
      }
      else{
        this.setState({ notify2: false });
      }

      if(phoneNumber === ''){
        this.setState({ notify3: true });
      }
      else{
        this.setState({ notify3: false });
      }

      if(salary === 0){
        this.setState({ notify4: true });
      }
      else{
        this.setState({ notify4: false });
      }

      if(discribe === ''){
        this.setState({ notify5: true });
      }
      else{
        this.setState({ notify5: false });
      }

      if(arraySkills !== undefined && arraySkills.length === 0){
        this.setState({ notify6: true });
      }
      else{
        this.setState({ notify6: false });
      
      }

      
      const newUser = {
        fullName, 
        address, 
        phoneNumber,
        skills: arraySkills, 
        salary, 
        discribe,
        userImg
      }

      if(selectdImage === null){
        updateInfo(newUser);
        this.setState({isUploading: false});
        
      }
      else{
        if(selectdImage.type.includes('image') !== true){
          this.notify();
          this.setState({ isUploading: false });
          return;
        }
        const uploadTask = storage.ref(`image/${email}/${selectdImage.name}`).put(selectdImage);
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
              if(fullName !== ''){
                newUser.userImg = url;
                updateInfo(newUser);
                this.setState({ userImg: url,
                  isUploading: false});
                }
              
            }.bind(this))
          }.bind(this)
        );
      }
      
    
      
  }   

  handleAddSkill(e){
    e.preventDefault();
    const { arraySkills, skill } = this.state;
    if(arraySkills.indexOf(skill) === -1){
      arraySkills.push(skill);
      this.setState({arraySkills: arraySkills});
    }
  }

  handleDeleteSkill(item){
    const {arraySkills} = this.state;
    arraySkills.splice(arraySkills.indexOf(item), 1);
    this.setState({arraySkills: arraySkills});
    console.log(this.state.arraySkills);
  }

  render() {
    const { fullName, email, address, phoneNumber, arraySkills, salary, discribe, role, reviewImage, isUploading,
          notify1, notify2, notify3, notify4, notify5, notify6
    } = this.state;

    let arrayTemp;
    if(arraySkills){
        arrayTemp = arraySkills.map((item, key) => 
          <span key={key}>
            <div className="mb-1"> 
                    <Button variant="secondary" size="sm" disabled={true}>{item}</Button>
                    <Button className="ml-1" size="sm" variant="secondary" onClick={() => this.handleDeleteSkill(item)}>
                        <i className="fa fa-trash-alt" aria-hidden="true"></i>
                    </Button>
              </div>
          </span>
          
          
            
        )
    }

    let { userImg } = this.state;
    const span = <span style={{ color: "red" }}>(*)</span>;
    if(reviewImage !== null){
      userImg = reviewImage;
    }
    return (
      <div className="container form-margin-top">
        <Row>
          <Col md="3" />
          <Col md="6" className="content-info"><h2>Thông tin cá nhân</h2></Col>
          <Col md="3" />
        </Row>
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
                    {reviewImage === null && userImg !== '' &&
                      <Media object  width={100}
                      height={100}
                      src={userImg} className="rounded-circle"/>
                    }
                    {reviewImage === null && userImg === '' &&
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
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="exampleEmail">Họ tên</Label>
                    <Input invalid={notify1} name="fullName" value={fullName} type="text" onChange={this.handleChange}/>
                    <FormFeedback>Tên không được bỏ trống!!!</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Email {span}</Label>
                    <Input name="email" value={email} type="text" disabled />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Loại tài khoản {span}</Label>
                    <Input name="role" value={role} type="text" disabled  />
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Địa chỉ</Label>
                    <Input invalid={notify2} name="address" value={address} type="text" onChange={this.handleChange}/>
                    <FormFeedback>Bạn đã bỏ trống địa chỉ!!!</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Số điện thoại</Label>
                    <Input invalid={notify3} name="phoneNumber" value={phoneNumber} type="text" onChange={this.handleChange}/>
                    <FormFeedback>Bạn đã bỏ trống số điện thoại!!!</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Tiền lương (đ/h)</Label>
                    <Input invalid={notify4} name="salary" value={salary} type="text" onChange={this.handleChange}/>
                    <FormFeedback>Bạn chưa nhập tiền lương!!!</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Giới thiệu</Label>
                    <Input type="textarea" invalid={notify5} name="discribe" value={discribe} onChange={this.handleChange}/>
                    <FormFeedback>Bạn đã bỏ trống số giới thiệu về bản thân!!!</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <div>
                      <Row>
                        <Col md="4">
                          <Label for="exampleEmail">Kỹ năng</Label>
                        </Col>
                        <Col md="8">
                      <div>{arrayTemp}</div> 
                        </Col>
                      </Row>
                      <Row>
                          <Col md="10">
                            <Input className="margin-top-1em" invalid={notify6} type="select" name="skill" onChange={this.handleChange}>
                              <option value="Mặc định">Chọn kỹ năng</option>
                              <option value="Toán">Toán</option>
                              <option value="Lý">Lý</option>
                              <option value="Hóa">Hóa</option>
                              <option value="Sinh">Sinh</option>
                              <option value="Sử">Sử</option>
                              <option value="Địa">Địa</option>
                              <option value="GDCD">GDCD</option>
                              <option value="Thể dục">Thể dục</option>
                            </Input>
                            <FormFeedback>Bạn chưa chọn kỹ năng nào!!!</FormFeedback>
                          </Col>
                          <Col md="2">
                            <Button className="float-right btn-upload margin-top-1em" type="button" onClick={this.handleAddSkill}>Thêm</Button>
                          </Col>
                      </Row>
                    </div>
                    
                  </FormGroup>

                  <Label className="margin-top-1em">{span}: Chỉ xem</Label>
                  <Button className="float-right btn-upload margin-top-1em" type="submit">Cập nhật
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
      </div>
    );
  }
}
const mapStateToProps = state => ({
  data: state.login.data
});

const actionCreator = {
  updateInfo: userActions.updateInfo,
  addSkill: userActions.addSkill,
  deleteSkill: userActions.deleteSkill
}
export default connect(mapStateToProps, actionCreator)(Info);
