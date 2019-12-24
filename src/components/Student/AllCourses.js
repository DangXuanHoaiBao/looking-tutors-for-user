import React from 'react';
import {Form, Image, Button, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import Header from '../Header';
import Footer from '../Footer';
import userActions from '../../actions/user';
import { connect } from 'react-redux';
import history from '../../helpers/history';

class AllCourses extends React.Component{
    constructor(props){
        super(props);
       
    }
    componentWillMount(){
        const {getAllCourses} = this.props;
        getAllCourses();
    }


    render(){

        const {allCourses} = this.props;
        
        let listCourses;
        if(allCourses){
            listCourses = allCourses.map((course, index)=> 
                <ListGroup className="list-group-flush">
                    <ListGroupItem>
                        <Card.Body>
                            <Card.Title>{course.nameCourse}</Card.Title>
                            <Card.Text>
                                <div>Tên: {course.fullName}</div>
                                <div>Email: {course.email}</div>
                                <div>Số điện thoại: {course.phoneNumber}</div>
                                <div>Địa chỉ: {course.address}</div>
                                <div>Giá: {course.salary}/h</div>
                                <div>Thời gian trong tuần: {course.time}</div>
                            </Card.Text>

                            <div>Mô tả: <span>{course.discribe}</span></div>
                            <div className="mt-2"><Button variant="primary" onClick={this.handleClickSubmitCourse}>Đăng kí học</Button></div>
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
                        <div className="col-md-12">
                            <Card className="shadow">
                                <Card.Img variant="top" src=''/>
                                <Card.Body>
                                    <Card.Title>Danh Sách Khóa Học</Card.Title>
                                    <Card.Text>
                                        {listCourses}
                                    </Card.Text>
                                </Card.Body>
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
    allCourses: state.getAllCourses.allCourses,
})

const actionCreator = {
    getAllCourses: userActions.getAllCourses
}

export default connect(mapStateToProps, actionCreator)(AllCourses);