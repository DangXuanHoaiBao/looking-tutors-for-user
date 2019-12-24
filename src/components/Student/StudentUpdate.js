import React from 'react';
import {Form, Button, Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import userActions from '../../actions/user';
import Header from '../Header';
import Footer from '../Footer';
import {storage} from '../../config/firebase-config';

import '../../styles/App.css';

class StudentUpdate extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            fullName: '',
            email: '',
            address: '',
            phoneNumber: '',
            imgFile: null,
            userImg: '',
            currentUrlImg: null,
            errorsFormIntroduce: {
                fullName: '',
                email: '',
                address: '',
                phoneNumber: '',
            },
        }
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleChangeFormIntroduce = this.handleChangeFormIntroduce.bind(this);
        this.handleSubmitFormIntroduce = this.handleSubmitFormIntroduce.bind(this);
    }

    componentWillMount(){
        const {userProfile} = this.props;
        const user = Object.assign({}, userProfile);
        this.setState({
            fullName: user.fullName,
            email: user.email,
            address: user.address,
            phoneNumber: user.phoneNumber, 
            userImg: user.userImg
        })
    }

    handleChangeImage(e){
        this.setState({
            currentUrlImg: URL.createObjectURL(e.target.files[0]),
            imgFile: e.target.files[0]
        });
    }

    handleChangeFormIntroduce(e){
        const {name, value} = e.target;
        let errorsFormIntroduce = {
            fullName: '',
            email: '',
            address: '',
            phoneNumber: ''
        }

        if(name === 'fullName'){
            errorsFormIntroduce.fullName = (value.length < 1 || value[0] === ' ') ? 'Tên không hợp lệ': '';
        }
        if(name === 'email'){
            errorsFormIntroduce.email = (value.length < 1 || value[0] === ' ') ? 'Email không hợp lệ': '';
        }
        if(name === 'address'){
            errorsFormIntroduce.address = (value.length < 1 || value[0] === ' ') ? 'Địa chỉ không hợp lệ': '';
        }
        if(name === 'phoneNumber'){
            errorsFormIntroduce.phoneNumber = (value.length < 1 || isNaN(value)) ? 'Số điện thoại không hợp lệ': '';
        }
      
        this.setState({
            [name]: value,
            errorsFormIntroduce
        })
    }

    

    handleSubmitFormIntroduce(e){
        e.preventDefault();
        const {fullName, email, address, phoneNumber, errorsFormIntroduce, imgFile, userImg} = this.state;
        const {updateProfile, data} = this.props;
        if(errorsFormIntroduce.fullName === '' && errorsFormIntroduce.email === '' && errorsFormIntroduce.address === '' && errorsFormIntroduce.phoneNumber === '' && 
           fullName !== '' && email !== '' && address !== '' && phoneNumber !== '')
        {
            const newUser = {
                fullName: fullName,
                email: email,
                address: address,
                phoneNumber: phoneNumber,
                userImg: userImg  
            }
            const oldEmail = data.user.email;
            if(imgFile){
                const uploadTask = storage.ref(`image/${imgFile.name}`).put(imgFile);
                uploadTask.on('state_changed', 
                (snapshot) => {

                },
                (error)=> {
                    console.log(error);
                },
                () => {
                    storage.ref('image').child(imgFile.name).getDownloadURL().then(url => {
                        newUser.userImg = url;
                        updateProfile(oldEmail, newUser);
                    })
                })
            }
            else{
                updateProfile(oldEmail, newUser);
            }
        }
    }

    render(){

        const {fullName, email, address, phoneNumber, errorsFormIntroduce, 
               currentUrlImg, userImg} = this.state;

        return(
            <div>
                <Header />
                <div className="container ">
                    <div className="row justify-content-center mt-4 mb-4" >
                        <div className='col-md-6 border border-dark shadow rounded'>
                            <div className="row justify-content-center">
                                <div className="col-md-10 mt-5 mb-5">
                                    <h3 className="mb-3">Cập Nhật Thông Tin Cá Nhân</h3>
                                    <Form onSubmit={this.handleSubmitFormIntroduce}>
                                        <Form.Group>
                                        {
                                            currentUrlImg ? 
                                                <Image src={currentUrlImg} roundedCircle className="w-50 h-50"/>
                                            :
                                                <Image src={userImg} roundedCircle className="w-50 h-50"/>
                                        }
                                        <Form.Control type="file" onChange={this.handleChangeImage} />
                                        </Form.Group>
                                        <Form.Group controlId="formBasicFullName">
                                            <Form.Label>Họ tên</Form.Label>
                                            <Form.Control type="text" name="fullName" value={fullName} onChange={this.handleChangeFormIntroduce}/>
                                            <Form.Text className="text-danger">{errorsFormIntroduce.fullName}</Form.Text>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>email</Form.Label>
                                            <Form.Control type="email" name="email" value={email}  onChange={this.handleChangeFormIntroduce}/>
                                            <Form.Text className="text-danger">{errorsFormIntroduce.email}</Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicAddress">
                                            <Form.Label>Địa chỉ</Form.Label>
                                            <Form.Control type="text" name="address" value={address}  onChange={this.handleChangeFormIntroduce}/>
                                            
                                        <Form.Text className="text-danger"> {errorsFormIntroduce.address}</Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPhoneNumber">
                                            <Form.Label>Số điện thoại</Form.Label>
                                            <Form.Control type="text" name="phoneNumber" value={phoneNumber}  onChange={this.handleChangeFormIntroduce}/>
                                            <Form.Text className="text-danger">{errorsFormIntroduce.phoneNumber}</Form.Text>
                                        </Form.Group>
                                        <Button className="w-100" variant="primary" type="submit">
                                            Cập Nhật
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

const mapStateToProps = state => ({
    data: state.login.data,
    userProfile: state.getProfile.userProfile
});

const actionCreator = {
    updateProfile: userActions.updateProfile,
    getProfile: userActions.getProfile
}

export default connect(mapStateToProps, actionCreator)(StudentUpdate);