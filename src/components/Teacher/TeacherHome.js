import React from 'react';
import {Form, Image, ProgressBar, Button, Card, ListGroup} from 'react-bootstrap';
import {connect} from 'react-redux';
import history from '../../helpers/history';
import Header from '../Header';
import Footer from '../Footer';
import userActions from '../../actions/user';

class TeacherHome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            address: '',
            salary: null,

        }
        this.handleClickUpdate = this.handleClickUpdate.bind(this);
        this.handleClickDetail = this.handleClickDetail.bind(this);
        this.handleClickRequestReceivedTeach = this.handleClickRequestReceivedTeach.bind(this);
    }

    componentWillMount(){
        const {getProfile, data, teacherGetAllCoursesNoRequest} = this.props;
        getProfile();
        teacherGetAllCoursesNoRequest(data.user);
    }

    handleClickUpdate(){
        history.push('/update-profile');
    }

    handleClickDetail(user){
        history.push('/detail', user)
    }

    handleClickRequestReceivedTeach(course, user){
        const {teacherRequestingReceivedTeachCourse} = this.props;
        console.log(course)
        teacherRequestingReceivedTeachCourse(course._id, user, course);
        history.push('/detail', user);
    }

    render(){
        const now = 60;
        const {address, salary} = this.state;
        const {userProfile, allCoursesNoRequest} = this.props;
        const user = Object.assign({}, userProfile);

        let listSkill;
        if(user.skills){
            listSkill = user.skills.map(item => 
                <div className="mb-1">
                    <Button variant="secondary" className="text-white" size="sm" disabled={true}>{item}</Button>
                </div>
            )
        }

        let listCoursesNoRequest
        if(allCoursesNoRequest){
            listCoursesNoRequest = allCoursesNoRequest.map((course, index)=> 
                <ListGroup.Item>
                    <Card.Body>
                        <Card.Title>Tên khóa học: {course.nameCourse}</Card.Title>
                        <Card.Text>
                            <div className="row">
                                <div className="col-md-2 mt-3">
                                <Image src={course.imageOwner} fluid roundedCircle/>
                                </div>
                                <div className="col-md-10 mt-2">  
                                    <h5 className="mb-1">Thông tin người đăng việc</h5>    
                                    <div className="ml-3">
                                        <div><i class="fas fa-user"></i> Họ tên: <span>{course.fullNameOwner}</span></div>
                                        <div><i class="fas fa-envelope-square"></i> Email: <span>{course.emailOwner}</span></div>
                                        <div><i class="fas fa-phone-square-alt"></i> Số điện thoại: <span>{course.phoneNumberOwner}</span></div>
                                    </div>
                                    <h5 className="mt-3">Thông tin công việc</h5>
                                    <div className="ml-3">
                                        <div><i class="fas fa-donate"></i> Giá: {course.salary}/h</div>
                                        <div><i class="far fa-clock"></i> Thời gian dạy: {course.time}</div>
                                        <div><i class="fas fa-map-marker-alt"></i> Địa chỉ: {course.address}</div>
                                        <div>Mô tả công việc: {course.discribe}</div>
                                    </div>
                                    <Button className="mt-2" variant="primary" onClick={() => this.handleClickRequestReceivedTeach(course, user)}>Nhận dạy</Button>
                                </div>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </ListGroup.Item>
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
                                    <Form.Control as="select" name="address" value={address} onChange={this.handleChange}>
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
                                    <Form.Control type="text" name="salary" value={salary} onChange={this.handleChange}></Form.Control>
                     
                            </Form.Group>
                        </div>
                        <div className="col-md-7">
                            <Card className="shadow">
                                <Card.Header className="font-weight-bold">Danh sách khóa học hiện có</Card.Header>
                                <ListGroup variant="flush">
                                    {listCoursesNoRequest}
                                </ListGroup>
                            </Card>
                        </div>

                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md-4">
                                    <Image src={user.userImg} fluid roundedCircle/>
                                </div>
                                <div>
                                    <div className="font-weight-bold">{user.fullName}<span><i className="fas fa-check-circle text-primary"></i></span></div>
                                    <span>{user.salary}/h</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 mt-1">
                                    <Button size="sm" onClick={() => this.handleClickDetail(user)}><i class="fa fa-home" aria-hidden="true"></i> Cá Nhân</Button>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <div><i className="fas fa-map-marker-alt text-primary"></i> &nbsp; <span>{user.address}</span></div>
                                    <div><i className="fas fa-envelope text-primary mr-2"></i>{user.email}</div>
                                    <div><i className="fas fa-phone-square text-primary mr-2"></i>{user.phoneNumber}</div>
                                    <p/>
                                    <div className="font-weight-bold">Tỉ lệ thành công</div>
                                    <ProgressBar now={now} label={`${now}%`} />
                                    <p/>
                                    <div className="font-weight-bold">Tỉ lệ đánh giá từ người học</div>
                                    <ProgressBar now={now} label={`${now}%`} />
                                    <p/>
                                    <Card className="mt-2">
                                        <Card.Header className="font-weight-bold">Giới thiệu</Card.Header>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                {user.discribe}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                    <p/>
                                    <div className="font-weight-bold"><i className="fa fa-cogs text-primary mr-1" aria-hidden="true"></i> Kĩ năng</div>
                                    {listSkill}
                                    <p/>
                                    <Button className="mt-2" variant="primary" onClick={this.handleClickUpdate}>Cập nhật thông tin</Button>
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
    data: state.login.data,
    allCoursesNoRequest: state.teacherGetAllCoursesNoRequest.allCoursesNoRequest
})
const actionCreator = {
    getProfile: userActions.getProfile,
    teacherGetAllCoursesNoRequest: userActions.teacherGetAllCoursesNoRequest,
    teacherRequestingReceivedTeachCourse: userActions.teacherRequestingReceivedTeachCourse
}

export default connect(mapStateToProps, actionCreator)(TeacherHome);