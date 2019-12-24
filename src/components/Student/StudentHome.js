import React from 'react';
import {Form, Image, Button, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import Header from '../Header';
import Footer from '../Footer';
import userActions from '../../actions/user';
import { connect } from 'react-redux';
import history from '../../helpers/history';

class StudentHome extends React.Component{
    constructor(props){
        super(props);
        this.handleClickUpdate = this.handleClickUpdate.bind(this);
        this.handleClickAddNewCourse = this.handleClickAddNewCourse.bind(this);
        this.handleClickSubmitCourse = this.handleClickSubmitCourse.bind(this);
    }
    componentWillMount(){
        const {getTeacherAll, getProfile} = this.props;
        getTeacherAll();
        getProfile();
    }

    handleClickUpdate(){
        history.push('/student-update');
    }

    handleClickAddNewCourse(user){
        history.push('/add-new-course', user);
    }

    handleClickSubmitCourse(){
        history.push('/all-courses');
    }

    render(){

        const {teacherAll, userProfile} = this.props;
        
        const user = Object.assign({}, userProfile);

        let listTeacher;
        if(teacherAll){
            listTeacher = teacherAll.map((teacher, index)=> 
                <ListGroup className="list-group-flush">
                    <ListGroupItem>
                        <Card.Body>
                            <div className='row'>
                                <div className='col-md-2'>
                                    <Image src={teacher.userImg} fluid roundedCircle/>
                                </div>
                                <div className='col-md-10'>
                                    <Card.Title>{teacher.fullName}</Card.Title>
                                    <Card.Text>
                                        <div>{teacher.address}</div>
                                        <div>{teacher.salary}/h</div>
                                    </Card.Text>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <div>Mô tả: <span>{teacher.discribe}</span></div>
                                    <div>Kĩ năng: <span>{teacher.skills.map(skill => <Button variant="secondary" size="sm" disabled>{skill}</Button>)}</span></div>
                                    <div className="mt-2"><Button variant="primary" onClick={this.handleClickSubmitCourse}>Đăng kí học</Button></div>
                                </div>
                            </div>
                        </Card.Body>   
                    </ListGroupItem>
                </ListGroup>
            )
        }

        return(
            <div>
                <Header/>
                <div className="container">
                    <div className="row mt-4 mb-4">
                        <div className="col-md-2">
                            <div className="mt-3 mb-3 font-weight-bold">Hiển Thị Theo:</div>
                            <Form.Group controlId="formDistrict">
                                <i className="fas fa-map-marker-alt text-primary"></i> &nbsp;
                                <Form.Label className="">Địa Điểm</Form.Label>
                                    <Form.Control as="select" name="address" onChange={this.handleChange}>
                                        <option></option>
                                        <option>TPHCM</option>
                                        <option>Quận 9</option>
                                        <option>Vung Tau</option>
                                        <option>Ha Noi</option>
                                        <option>My Tho</option>
                                    </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formDistrict">
                                <Form.Label className="">Giá Mỗi Giờ</Form.Label>
                                    <Form.Control type="text" name="salary"  onChange={this.handleChange}></Form.Control>
                                    <Form.Text className="text-danger">{}</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formDistrict">
                                <i className="fa fa-cogs text-primary" aria-hidden="true"></i> &nbsp;
                                <Form.Label className="">Kĩ Năng</Form.Label>
                                    <Form.Control as="select" name="skill"  onChange={this.handleChange}>
                                        <option></option>
                                        <option>Toán</option>
                                    </Form.Control>
                            </Form.Group>
                        </div>

                        <div className="col-md-7">
                            <Card className="shadow">
                                <Card.Img variant="top" src=''/>
                                <Card.Body>
                                    <Card.Title>Danh Sách Người Dạy</Card.Title>
                                    <Card.Text>
                                        {listTeacher}
                                    </Card.Text>
                                </Card.Body>
                                
                            </Card>
                        </div>
                    
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-4"><Image src={user.userImg} fluid roundedCircle/></div>
                                <div>
                                    <div className="font-weight-bold">{user.fullName}<span><i className="fas fa-check-circle text-primary"></i></span></div>
                                    <div><i className="fas fa-map-marker-alt text-primary"></i> &nbsp; <span>{user.address}</span></div>
                                </div>
                            </div>
                            
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <div><i className="fas fa-envelope mr-2"></i>{user.email}</div>
                                    <div><i className="fas fa-phone-square mr-2"></i>{user.phoneNumber}</div>
                                    <Button className="mt-2" variant="primary" onClick={this.handleClickUpdate}>Cập nhật thông tin</Button>
                                    <div className="mt-3"><Button onClick={() => this.handleClickAddNewCourse(user)}> Thêm khóa học mới</Button></div>
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
    teacherAll: state.getTeacherAll.teacherAll,
    userProfile: state.getProfile.userProfile
})

const actionCreator = {
    getTeacherAll: userActions.getTeacherAll,
    getProfile: userActions.getProfile
}

export default connect(mapStateToProps, actionCreator)(StudentHome);