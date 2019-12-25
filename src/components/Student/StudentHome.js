import React from 'react';
import {Form, Image, Button, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import userActions from '../../actions/user';
import { connect } from 'react-redux';
import history from '../../helpers/history';
import {Media} from 'reactstrap';
import ProfileImg from '../../images/profile.png'

class StudentHome extends React.Component{
    constructor(props){
        super(props);
        this.handleClickAddNewCourse = this.handleClickAddNewCourse.bind(this);
        this.handleClickSubmitCourse = this.handleClickSubmitCourse.bind(this);
        this.handleClickDetail = this.handleClickDetail.bind(this);
    }
    componentWillMount(){
        const {getTeacherAll, getProfile} = this.props;
        getTeacherAll();
        getProfile();
    }

    handleClickAddNewCourse(ownerCourse){
        history.push('/add-new-course', ownerCourse);
    }

    handleClickSubmitCourse(student, teacher){
        const user = {
            student,
            teacher
        }
        history.push('/all-courses', user);
    }

    handleClickDetail(student){
        history.push('/detail', student);
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
                                    <Media object width={50} height={50} src={teacher.userImg ? teacher.userImg : ProfileImg} className="rounded-circle"/>
                                </div>
                                <div className='col-md-10'>
                                    <Card.Title>{teacher.fullName}</Card.Title>
                                    <div><i class="fas fa-map-marker-alt"></i> &nbsp; {teacher.address}</div>
                                    <div><i class="fas fa-donate"></i> &nbsp; {teacher.salary}/h</div> 
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <div className="font-weight-bold">Mô tả:</div> &emsp;&emsp;&emsp;<span>{teacher.discribe}</span>
                                    <div className="font-weight-bold">Kĩ năng:</div> &emsp;&emsp;&emsp; <span>{teacher.skills.map(skill => <Button variant="secondary" size="sm" disabled>{skill}</Button>)}</span>
                                    <div className="mt-2"><Button variant="primary" onClick={() => this.handleClickSubmitCourse(user, teacher)}>Đăng kí học</Button></div>
                                </div>
                            </div>
                        </Card.Body>   
                    </ListGroupItem>
                </ListGroup>
            )
        }

        return(
            <div>
                <div className="container margin-top-6em">
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
                            <div className="row">
                                <div className="col-md-12 mt-1">
                                    <Button size="sm" onClick={() => this.handleClickDetail(user)}><i class="fa fa-home" aria-hidden="true"></i> Cá Nhân</Button>
                                </div>
                            </div>
                            
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <div><i className="fas fa-envelope mr-2"></i>{user.email}</div>
                                    <div><i className="fas fa-phone-square mr-2"></i>{user.phoneNumber}</div>
                                    <div className="mt-3"><Button onClick={() => this.handleClickAddNewCourse(user)}> Thêm khóa học mới</Button></div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
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