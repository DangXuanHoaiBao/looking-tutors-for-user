import React from 'react';
import {Image, Card, ListGroup, Button} from 'react-bootstrap';
import history from '../../helpers/history';
import Header from '../Header';
import Footer from '../Footer';
import userActions from '../../actions/user';
import { connect } from 'react-redux';

class TeacherDetail extends React.Component{
    constructor(props){
        super(props);
        this.handleClickCancelRequestingReceivedTeach = this.handleClickCancelRequestingReceivedTeach.bind(this);
    }

    componentWillMount(){
        const {teacherGetAllCoursesRequestingTeach, teacherGetAllCoursesRequestingReceivedTeach} = this.props;
        const teacher = history.location.state;
        teacherGetAllCoursesRequestingTeach(teacher);
        teacherGetAllCoursesRequestingReceivedTeach(teacher);
    }

    handleClickCancelRequestingReceivedTeach(idCourse){
        const {teacherCancelRequestingReceivedTeach} = this.props;
        teacherCancelRequestingReceivedTeach(idCourse);
    }

    render(){
        const teacher = history.location.state;
        const {allCoursesRequestingTeach, allCoursesRequestingReceivedTeach} = this.props;
        let listCoursesRequestingTeach;
        if(allCoursesRequestingTeach){
            listCoursesRequestingTeach = allCoursesRequestingTeach.map(course => 
                <ListGroup.Item>
                    <Card.Body>
                        <Card.Title>Tên khóa học: {course.nameCourse}</Card.Title>
                        <Card.Text>
                            <div className="row">
                                <div className="col-md-1 mt-3">
                                <Image src={course.imageOwner} fluid roundedCircle/>
                                </div>
                                <div className="mt-2">  
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
                                    <Button className="mt-2" variant="primary">Chấp Nhận</Button>
                                </div>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </ListGroup.Item>
            )
        }

        let listCoursesRequestingReceivedTeach;
        if(allCoursesRequestingReceivedTeach){
            listCoursesRequestingReceivedTeach = allCoursesRequestingReceivedTeach.map(course => 
                <ListGroup.Item>
                    <Card.Body>
                        <Card.Title>Tên khóa học: {course.nameCourse}</Card.Title>
                        <Card.Text>
                            <div className="row">
                                <div className="col-md-1 mt-3">
                                <Image src={course.imageOwner} fluid roundedCircle/>
                                </div>
                                <div className="mt-2">  
                                    <h5 className="mb-1">Thông tin người đăng việc</h5>    
                                    <div className="ml-3">
                                        <div><i class="fas fa-user"></i> Họ tên: <span>{course.fullNameOwner}</span></div>
                                        <div><i class="fas fa-envelope-square"></i> Email: <span>{course.emailOwner}</span></div>
                                        <div><i class="fas fa-phone-square-alt"></i> Số điện thoại: <span>{course.phoneNumberOwner}</span></div>
                                    </div>
                                    <h5 className="mt-3">Thông tin khóa học</h5>
                                    <div className="ml-3">
                                        <div><i class="fas fa-donate"></i> Giá: {course.salary}/h</div>
                                        <div><i class="far fa-clock"></i> Thời gian dạy: {course.time}</div>
                                        <div><i class="fas fa-map-marker-alt"></i> Địa chỉ: {course.address}</div>
                                        <div>Mô tả công việc: {course.discribe}</div>
                                    </div>
                                    <Button className="mt-2" variant="primary" onClick={() => this.handleClickCancelRequestingReceivedTeach(course._id)}>Hủy bỏ</Button>
                                </div>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </ListGroup.Item>
            )
        }

        let listSkill;
        if(teacher){
            listSkill = teacher.skills.map((skill, index) => {
                return <Button key={index} variant="secondary" disabled >{skill}</Button>
            })
        }
       
        return (
            <div>
                <div className="container margin-top-6em">
                    <div className="col-md-12 mt-3 mb-3 border shadow">
                        <div className="row mt-3">
                            <div className="col-md-1">
                                <Image src={teacher.userImg} className="img-fluid rounded-circle" />
                            </div>
                            <div className="col-md-11 ml--20 ">
                                <div className="font-weight-bold">{teacher.fullName} <span><i className="fas fa-check-circle text-primary"></i></span></div>
                                <i className="fas fa-map-marker-alt text-primary"></i> &nbsp; <span>{teacher.address}</span>
                            </div>
                        </div>
                        <div className="row mb-3 ml-1 mr-1">
                            <div className="col-md-12">
                                <div className="row">
                                    <Card.Body>
                                        <Card.Text>
                                            <div><i class="fas fa-envelope-square"></i> <span className="font-weight-bold">Email:</span> <span>{teacher.email}</span></div>
                                            <div><i class="fas fa-phone-square-alt"></i>  <span className="font-weight-bold">Số điện thoại:</span> <span>{teacher.phoneNumber}</span></div>
                                            <div> <span className="font-weight-bold">Giới thiệu: </span> {teacher.discribe} </div>
                                            <div> <span className="font-weight-bold">Kĩ năng: </span>{listSkill} </div>
                                        </Card.Text>
                                    </Card.Body>
                                </div>
                                <div className="row">
                                    <div className="col-md-2">
                                        {teacher.salary}Giá/h
                                    </div>
                                    <div className="col-md-2">
                                        Số lượng lớp đã nhận
                                    </div>
                                    <div className="">
                                        Tổng số giờ đã dạy
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <Card className="shadow">
                                <Card.Header className="font-weight-bold">Danh sách khóa học đang yêu cầu dạy</Card.Header>
                                <ListGroup variant="flush">
                                    {listCoursesRequestingTeach}
                                </ListGroup>
                            </Card>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-12">
                            <Card className="shadow">
                                <Card.Header className="font-weight-bold">Danh sách khóa học đang yêu cầu được dạy</Card.Header>
                                <ListGroup variant="flush">
                                    {listCoursesRequestingReceivedTeach}
                                </ListGroup>
                            </Card>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div  className="col-md-12">
                            <Card className="shadow">
                                <Card.Header className="font-weight-bold">Lịch sử đã dạy và phản hồi</Card.Header>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Card.Body>
                                            <Card.Title>Toán luyện thi đại học</Card.Title>
                                            <Card.Text>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <p>Chất lượng dạy tốt.</p>
                                            </Card.Text>
                                        </Card.Body>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    allCoursesRequestingTeach: state.teacherGetAllCoursesRequestingTeach.allCoursesRequestingTeach,
    allCoursesRequestingReceivedTeach: state.teacherGetAllCoursesRequestingReceivedTeach.allCoursesRequestingReceivedTeach
})

const actionCreator = {
    teacherGetAllCoursesRequestingTeach: userActions.teacherGetAllCoursesRequestingTeach,
    teacherGetAllCoursesRequestingReceivedTeach: userActions.teacherGetAllCoursesRequestingReceivedTeach,
    teacherCancelRequestingReceivedTeach: userActions.teacherCancelRequestingReceivedTeach
}
export default connect(mapStateToProps, actionCreator)(TeacherDetail);