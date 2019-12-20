import React from 'react';
import {Form, Button, Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import userActions from '../../actions/user';
import Header from '../Header';
import Footer from '../Footer';
import {storage} from '../../firebase/config';

import '../../styles/App.css';

class TeacherUpdate extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            fullName: '',
            email: '',
            address: '',
            phoneNumber: '',
            salary: null,
            discribe: '',
            arraySkills: [],
            skill: '',
            imgFile: null,
            userImg: '',
            currentUrlImg: null,
            errorsFormIntroduce: {
                fullName: '',
                email: '',
                address: '',
                phoneNumber: '',
                discirbe: '',
                salary: null
            },
            errorsFormSkill: ''
        }
        this.handleChangeImage = this.handleChangeImage.bind(this);
        this.handleChangeFormIntroduce = this.handleChangeFormIntroduce.bind(this);
        this.handleChangeFormAddSkill = this.handleChangeFormAddSkill.bind(this);
        this.handleSubmitFormIntroduce = this.handleSubmitFormIntroduce.bind(this);
        this.handleSubmitFormAddSkill = this.handleSubmitFormAddSkill.bind(this);
        this.handleClickButtonDeleteSkill = this.handleClickButtonDeleteSkill.bind(this);
    }

    componentWillMount(){
        const {userProfile} = this.props;
        const user = Object.assign({}, userProfile);
        this.setState({
            fullName: user.fullName,
            email: user.email,
            address: user.address,
            phoneNumber: user.phoneNumber,
            discribe: user.discribe,
            arraySkills: user.skills,
            userImg: user.userImg,
            salary: user.salary
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
            phoneNumber: '',
            discribe: '',
            salary: null
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
        if(name === 'discribe'){
            errorsFormIntroduce.discribe = (value.length < 1 || value[0] === ' ') ? 'Giới thiệu không hợp lệ': '';
        }
        if(name === 'salary'){
            errorsFormIntroduce.salary = (value.length < 1 || isNaN(value)) ? 'Lương theo giờ không hợp lệ': '';
        }
        this.setState({
            [name]: value,
            errorsFormIntroduce
        })
    }

    handleChangeFormAddSkill(e){
        const {name, value} = e.target;
        let errorsFormSkill = '';
        if(name === 'skill'){
            errorsFormSkill = (value.length < 1 || value[0] === ' ') ? 'Kĩ năng không hợp lệ': '';
        }
        this.setState({
            [name]: value,
            errorsFormSkill
        })
    }

    handleSubmitFormIntroduce(e){
        e.preventDefault();
        const {fullName, email, address, phoneNumber, discribe, errorsFormIntroduce, imgFile, userImg, salary} = this.state;
        const {updateProfile, data} = this.props;
        console.log(errorsFormIntroduce.fullName + " " + errorsFormIntroduce.email + " " + errorsFormIntroduce.phoneNumber + " " + errorsFormIntroduce.address + " " + errorsFormIntroduce.discirbe + " " + errorsFormIntroduce.salary);
        if(errorsFormIntroduce.fullName === '' && errorsFormIntroduce.email === '' && errorsFormIntroduce.address === '' && errorsFormIntroduce.phoneNumber === '' && 
           errorsFormIntroduce.discribe === '' && errorsFormIntroduce.salary === null && salary !== '' && fullName !== '' && email !== '' && address !== '' && phoneNumber !== '' && 
           discribe !== '' )
        {
            console.log('ta da vao')
            const newUser = {
                fullName: fullName,
                email: email,
                address: address,
                phoneNumber: phoneNumber,
                discribe: discribe,
                userImg: userImg,
                salary: salary
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
                        console.log(newUser.userImg);
                        updateProfile(oldEmail, newUser);
                    })
                })
            }
            else{
                updateProfile(oldEmail, newUser);
            }
        }
    }

    handleSubmitFormAddSkill(e){
        e.preventDefault();
        const {addSkill, data} = this.props;
        const {skill, errorFormSkill} = this.state;
        if(!errorFormSkill && skill !== ''){
            const userEmail = data.user.email;
            addSkill(userEmail, skill);
        }
    }

    handleClickButtonDeleteSkill(item){
        const {deleteSkill, data} = this.props;
        const userEmail = data.user.email;
        deleteSkill(userEmail, item);
    }

    render(){

        const {fullName, email, address, phoneNumber, discribe, skill, arraySkills, errorsFormIntroduce, 
               errorsFormSkill, currentUrlImg, salary, userImg} = this.state;
        // const {message} = this.props;
        // if(message){
        //     alert(message);
        // }
        let arrayTemp;
        if(arraySkills){
            arrayTemp = arraySkills.map(item => 
                <div className="mb-1">
                    <Button variant="secondary" size="sm" disabled={true}>{item}</Button>
                    <Button className="ml-1" size="sm" variant="secondary" onClick={() => this.handleClickButtonDeleteSkill(item)}>
                        <i className="fa fa-trash-alt" aria-hidden="true"></i>
                    </Button>
                </div>
            )
        }


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
                                            {errorsFormIntroduce.fullName ? <Form.Text className="text-danger">{errorsFormIntroduce.fullName}</Form.Text> : null}
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>email</Form.Label>
                                            <Form.Control type="email" name="email" value={email}  onChange={this.handleChangeFormIntroduce}/>
                                            {errorsFormIntroduce.email ? <Form.Text className="text-danger">{errorsFormIntroduce.email}</Form.Text> : null}
                                        </Form.Group>
                                        <Form.Group controlId="formBasicAddress">
                                            <Form.Label>Địa chỉ</Form.Label>
                                            <Form.Control type="text" name="address" value={address}  onChange={this.handleChangeFormIntroduce}/>
                                            
                                            {errorsFormIntroduce.address ? <Form.Text className="text-danger"> {errorsFormIntroduce.address}</Form.Text> : null}
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPhoneNumber">
                                            <Form.Label>Số điện thoại</Form.Label>
                                            <Form.Control type="text" name="phoneNumber" value={phoneNumber}  onChange={this.handleChangeFormIntroduce}/>
                                            {errorsFormIntroduce.phoneNumber ? <Form.Text className="text-danger">{errorsFormIntroduce.phoneNumber}</Form.Text> : null}
                                        </Form.Group>
                                        <Form.Group controlId="formBasicSalary">
                                            <Form.Label>Lương theo giờ</Form.Label>
                                            <Form.Control type="text" name="salary" value={salary}  onChange={this.handleChangeFormIntroduce}/>
                                            {errorsFormIntroduce.salary ? <Form.Text className="text-danger">{errorsFormIntroduce.salary}</Form.Text> : null}
                                        </Form.Group>
                                        <Form.Group controlId="formBasicDiscribe">
                                            <Form.Label>Giới thiệu</Form.Label>
                                            <Form.Control className="" type="text" name="discribe" value={discribe}  onChange={this.handleChangeFormIntroduce}/>
                                            {errorsFormIntroduce.discribe ? <Form.Text className="text-danger">{errorsFormIntroduce.discribe}</Form.Text> : null}
                                        </Form.Group>
                                        <Button className="w-100" variant="primary" type="submit">
                                            Cập Nhật
                                        </Button>
                                    </Form>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row justify-content-center mt-4 mb-4" >
                        <div className='col-md-6 border border-dark shadow rounded'>
                            <div className="row justify-content-center">
                                <div className="col-md-10 mt-5 mb-5">
                                <h3 className="mb-3">Cập Nhật Kĩ Năng</h3>
                                <div >{arrayTemp} </div>
                                <Form onSubmit={this.handleSubmitFormAddSkill}> 
                                    <Form.Group controlId="formBasicSkills">
                                        <Form.Label>kĩ năng</Form.Label>
                                        <Form.Control type="text" name="skill" value={skill} onChange={this.handleChangeFormAddSkill}/>
                                        {errorsFormSkill ? <Form.Text className="text-danger">{errorsFormSkill}</Form.Text> : null}
                                    </Form.Group>
                                    <Button className="w-100 mt-2" variant="primary" type="submit"> Thêm Kĩ Năng Mới </Button>
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
    userProfile: state.getProfile.userProfile,
    message: state.updateProfile.message
});

const actionCreator = {
    updateProfile: userActions.updateProfile,
    addSkill: userActions.addSkill,
    deleteSkill: userActions.deleteSkill,
    getProfile: userActions.getProfile
}

export default connect(mapStateToProps, actionCreator)(TeacherUpdate);