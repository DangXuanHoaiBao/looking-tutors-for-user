import React from 'react';
import {Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import userActions from '../../actions/user';

class TeacherUpdate extends React.Component{
    // constructor(props){
    //     super(props);

    // }

    componentWillMount(){
        const {getProfile} = this.props;
        getProfile();
    }

    render(){

        const {userProfile} = this.props;
        console.log(userProfile);

        return(
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
                                        <Form.Control type="text" placeholder="" name="fullName" Change={this.handleChange}/>
                                        <Form.Text className="text-danger"></Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="" name="email"  onChange={this.handleChange}/>
                                        <Form.Text className="text-danger"></Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicAddress">
                                        <Form.Label>Địa Chỉ</Form.Label>
                                        <Form.Control type="text" placeholder="" name="address"  onChange={this.handleChange}/>
                                        <Form.Text className="text-danger"></Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPhoneNumber">
                                        <Form.Label>Số Điện Thoại</Form.Label>
                                        <Form.Control type="text" placeholder="" name="phoneNumber"  onChange={this.handleChange}/>
                                        <Form.Text className="text-danger"></Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicDiscribe">
                                        <Form.Label>Giới Thiệu</Form.Label>
                                        <Form.Control className="" type="text" placeholder="" name="discribe"  onChange={this.handleChange}/>
                                        <Form.Text className="text-danger"></Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicSkills">
                                        <Form.Label>Kĩ Năng</Form.Label>
                                        <Form.Control type="text" placeholder="" name="skills" onChange={this.handleChange}/>
                                        <Form.Text className="text-danger"></Form.Text>
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
        );
    }
}

const mapStateToProps = state => ({
    userProfile: state.getProfile.userProfile
});

const actionCreator = {
    getProfile: userActions.getProfile
}

export default connect(mapStateToProps, actionCreator)(TeacherUpdate);