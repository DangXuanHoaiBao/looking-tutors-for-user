import React from 'react';
import {Image, Card, ListGroup, Button} from 'react-bootstrap';
import history from '../../helpers/history';
import Header from '../Header';
import Footer from '../Footer';
import userActions from '../../actions/user';
import { connect } from 'react-redux';

class StudentDetail extends React.Component{
    constructor(props){
        super(props);
        this.handleClickAccept = this.handleClickAccept.bind(this);
    }

    componentWillMount(){
        const {studentGetAllCoursesRequestingReceivedTeach} = this.props;
        const student = history.location.state;
        studentGetAllCoursesRequestingReceivedTeach(student);
    }
    
    handleClickAccept(student, course){
        const arrayObject = {student, course}
        history.push('/create-contract', arrayObject)
    }

    render(){
        const student = history.location.state;
        const {allCoursesRequestingReceivedTeach} = this.props;
        let listCoursesReceivedTeach;
        if(allCoursesRequestingReceivedTeach){
            listCoursesReceivedTeach = allCoursesRequestingReceivedTeach.map(course => 
                <ListGroup.Item>
                    <Card.Body>
                        <Card.Title>Tên khóa học: {course.nameCourse}</Card.Title>
                        <Card.Text>
                            <div className="row">
                                <div className="col-md-1 mt-3">
                                <Image src={course.imageOwner} fluid roundedCircle/>
                                </div>
                                <div className="mt-2">  
                                    <h5 className="mb-1">Thông tin người yêu cầu được dạy</h5>    
                                    <div className="ml-3">
                                        <div><i class="fas fa-user"></i> Họ tên: <span>{course.fullNameRequestor}</span></div>
                                        <div><i class="fas fa-envelope-square"></i> Email: <span>{course.emailRequestor}</span></div>
                                        <div><i class="fas fa-phone-square-alt"></i> Số điện thoại: <span>{course.phoneNumberRequestor}</span></div>
                                    </div>
                                    <h5 className="mt-3">Thông tin công việc</h5>
                                    <div className="ml-3">
                                        <div><i class="fas fa-donate"></i> Giá: {course.salary}/h</div>
                                        <div><i class="far fa-clock"></i> Thời gian dạy: {course.time}</div>
                                        <div><i class="fas fa-map-marker-alt"></i> Địa chỉ: {course.address}</div>
                                        <div>Mô tả công việc: {course.discribe}</div>
                                    </div>
                                    <Button className="mt-2" variant="primary" onClick={() => this.handleClickAccept(student, course)}>Chấp Nhận</Button>
                                </div>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </ListGroup.Item>
            )
        }
       
        return (
            <div>
                <Header/>
                    <div className="container margin-top-6em">
                    <div className="col-md-12 mt-3 mb-3 border shadow">
                            <div className="row mt-3">
                                <div className="col-md-1">
                                    <Image src={student.userImg} className="img-fluid rounded-circle" />
                                </div>
                                <div className="col-md-11 ml--20 ">
                                    <div className="font-weight-bold">{student.fullName} <span><i className="fas fa-check-circle text-primary"></i></span></div>
                                    <i className="fas fa-map-marker-alt text-primary"></i> &nbsp; <span>{student.address}</span>
                                </div>
                            </div>
                            <div className="row mb-3 ml-1 mr-1">
                                <div className="col-md-12">
                                    <div className="row">
                                        <Card.Body>
                                            <Card.Text>
                                                <div><i class="fas fa-envelope-square"></i> <span className="font-weight-bold">Email:</span> <span>{student.email}</span></div>
                                                <div><i class="fas fa-phone-square-alt"></i>  <span className="font-weight-bold">Số điện thoại:</span> <span>{student.phoneNumber}</span></div>
                                            </Card.Text>
                                        </Card.Body>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <Card className="shadow">
                                    <Card.Header className="font-weight-bold">Danh sách khóa học có người đang yêu cầu được dạy</Card.Header>
                                    <ListGroup>
                                        {listCoursesReceivedTeach}
                                    </ListGroup>
                                </Card>
                            </div>
                        </div>
                    </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    allCoursesRequestingReceivedTeach: state.studentGetAllCoursesRequestingReceivedTeach.allCoursesRequestingReceivedTeach
})

const actionCreator = {
    studentGetAllCoursesRequestingReceivedTeach: userActions.studentGetAllCoursesRequestingReceivedTeach
}
export default connect(mapStateToProps, actionCreator)(StudentDetail);