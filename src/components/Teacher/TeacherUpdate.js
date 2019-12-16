import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import userActions from '../../actions/user';
import Header from '../Header';
import Footer from '../Footer';

class TeacherUpdate extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            fullName: '',
            email: '',
            address: '',
            phoneNumber: '',
            discribe: '',
            skills: '',
            errors: {
                fullName: '',
                email: '',
                address: '',
                phoneNumber: '',
                discirbe: '',
                arraySkills: [],
                skills: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount(){
        const {getProfile} = this.props;
        getProfile();
    }

    componentDidMount(){
        const {userProfile} = this.props;
        if(userProfile){
            this.setState({
                fullName: userProfile.fullName,
                email: userProfile.email,
                address: userProfile.address,
                phoneNumber: userProfile.phoneNumber,
                discribe: userProfile.discribe,
                arraySkills: userProfile.skills
            })
        }
    }

    handleChange(e){
        const {name, value} = e.target;
        let errors = {
            fullName: '',
            email: '',
            address: '',
            phoneNumber: '',
            discribe: '',
            skills: ''
        }

        if(name === 'fullName'){
            errors.fullName = (value.length < 1 || value[0] === ' ') ? 'Tên không hợp lệ': '';
        }
        if(name === 'email'){
            errors.email = (value.length < 1 || value[0] === ' ') ? 'Email không hợp lệ': '';
        }
        if(name === 'address'){
            errors.address = (value.length < 1 || value[0] === ' ') ? 'Địa chỉ không hợp lệ': '';
        }
        if(name === 'phoneNumber'){
            errors.phoneNumber = (value.length < 1 || value.NaN) ? 'Số điện thoại không hợp lệ': '';
        }
        if(name === 'discribe'){
            errors.discribe = (value.length < 1 || value[0] === ' ') ? 'Giới thiệu không hợp lệ': '';
        }
        if(name === 'skills'){
            errors.skills = (value.length < 1 || value[0] === ' ') ? 'Kĩ năng không hợp lệ': '';
        }

        this.setState({
            [name]: value,
            errors
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const {fullName, email, address, phoneNumber, discribe, skills, errors} = this.state;
        const {updateProfile, userProfile} = this.props;

        if(errors.fullName === '' && errors.email === '' && errors.address === '' && errors.phoneNumber === '' && 
           errors.discribe === '' && errors.skills === '' && fullName !== '' && email !== '' && address !== '' &&
           phoneNumber !== '' && discribe !== '' && skills.length !== '')
        {
            const newUser = {
                fullName: fullName,
                email: email,
                address: address,
                phoneNumber: phoneNumber,
                discribe: discribe,
                skills: skills
            }
            const oldEmail = userProfile.email;
            updateProfile(oldEmail, newUser);
            
        }
    }

    handleClick(skillItem){
        const {deleteSkill, userProfile} = this.props
        const userEmail = userProfile.user.email
        deleteSkill(userEmail, skillItem)
    }

    render(){

        const {fullName, email, address, phoneNumber, discribe, arraySkills, skills, errors} = this.state;
        // const {message} = this.props;
        // if(message){
        //     alert(message);
        // }

        // const arrayTemp = arraySkills.map(skillItem => 
        //     <div className="mb-1">
        //         <Button variant="secondary" disabled={true}>{skillItem}</Button>
        //         <Button className="ml-1" variant="secondary" onClick={() => this.handleClick(skillItem)}>
        //             <i className="fa fa-trash-alt" aria-hidden="true"></i>
        //         </Button>
        //     </div>
        // )

        return(
            <div>
                <Header />
                <div className="container ">
                    <div className="row justify-content-center mt-4 mb-4" >
                        <div className='col-md-6 border border-dark shadow rounded'>
                            <div className="row justify-content-center">
                                <div className="col-md-10 mt-5 mb-5">
                                    <h3 className="mb-3">Cập Nhật Thông Tin Cá Nhân</h3>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Group>
                                            <Form.Label>Chọn File Ảnh</Form.Label>
                                            <Form.Control type="file" placeholder=""/>
                                            <Form.Text className="text-danger"></Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicFullName">
                                            <Form.Label>Họ Tên</Form.Label>
                                            <Form.Control type="text" name="fullName" value={fullName} onChange={this.handleChange}/>
                                            {errors.fullName ? <Form.Text className="text-danger">{errors.fullName}</Form.Text> : null}
                                        </Form.Group>

                                        <Form.Group controlId="formBasicEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" name="email" value={email}  onChange={this.handleChange}/>
                                            {errors.email ? <Form.Text className="text-danger">{errors.email}</Form.Text> : null}
                                        </Form.Group>
                                        <Form.Group controlId="formBasicAddress">
                                            <Form.Label>Địa Chỉ</Form.Label>
                                            <Form.Control type="text" name="address" value={address}  onChange={this.handleChange}/>
                                            {errors.address ? <Form.Text className="text-danger"> {errors.address}</Form.Text> : null}
                                        </Form.Group>
                                        <Form.Group controlId="formBasicPhoneNumber">
                                            <Form.Label>Số Điện Thoại</Form.Label>
                                            <Form.Control type="text" name="phoneNumber" value={phoneNumber}  onChange={this.handleChange}/>
                                            {errors.phoneNumber ? <Form.Text className="text-danger">{errors.phoneNumber}</Form.Text> : null}
                                        </Form.Group>
                                        <Form.Group controlId="formBasicDiscribe">
                                            <Form.Label>Giới Thiệu</Form.Label>
                                            <Form.Control className="" type="text" name="discribe" value={discribe}  onChange={this.handleChange}/>
                                            {errors.discribe ? <Form.Text className="text-danger">{errors.discribe}</Form.Text> : null}
                                        </Form.Group>

                                        <Form.Group controlId="formBasicSkills">
                                            <Form.Label>Kĩ Năng</Form.Label>
                                            {/* <div >{arrayTemp} </div> */}
                                            <Form.Control type="text" name="skills" value={skills} onChange={this.handleChange}/>
                                            {errors.skills ? <Form.Text className="text-danger">{errors.skills}</Form.Text> : null}
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
    userProfile: state.getProfile.userProfile,
    message: state.updateProfile.message
});

const actionCreator = {
    getProfile: userActions.getProfile,
    updateProfile: userActions.updateProfile,
    deleteSkill: userActions.deleteSkill
}

export default connect(mapStateToProps, actionCreator)(TeacherUpdate);