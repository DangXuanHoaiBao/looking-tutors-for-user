import React from 'react';
import {Button, Card, ListGroup, Image} from 'react-bootstrap';
import Header from '../Header';
import Footer from '../Footer';
import userActions from '../../actions/user';
import { connect } from 'react-redux';
import history from '../../helpers/history';

class AllCourses extends React.Component{
    constructor(props){
        super(props);
        this.handleClickSubmitCourse = this.handleClickSubmitCourse.bind(this);
    }
    componentWillMount(){
        const {studentGetAllCoursesNoReceived} = this.props;
        const {requestor} = history.location.state;
        studentGetAllCoursesNoReceived(requestor);
    }

    handleClickSubmitCourse(idCourse){
        const {student, teacher} = history.location.state;
        const {studentRequestingTeachCourse} = this.props;
        studentRequestingTeachCourse(idCourse, student, teacher);
        history.push('/');
    }

    render(){

        const {allCoursesNoReceived} = this.props;
        
        let listCourses;
        if(allCoursesNoReceived){
            listCourses = allCoursesNoReceived.map((course, index)=> 
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
                                    <Button className="mt-2" variant="primary" onClick={() => this.handleClickSubmitCourse(course._id)}>Yêu cầu dạy</Button>
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
                        <div className="col-md-12">
                            <Card className="shadow">
                                <Card.Header className="font-weight-bold">Danh sách khóa học hiện có</Card.Header>
                                <ListGroup variant="flush">
                                    {listCourses}
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
    allCoursesNoReceived: state.studentGetAllCoursesNoReceived.allCoursesNoReceived,
})

const actionCreator = {
    studentGetAllCoursesNoReceived: userActions.studentGetAllCoursesNoReceived,
    studentRequestingTeachCourse: userActions.studentRequestingTeachCourse
}

export default connect(mapStateToProps, actionCreator)(AllCourses);