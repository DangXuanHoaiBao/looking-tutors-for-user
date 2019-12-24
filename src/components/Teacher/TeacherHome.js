import React from 'react';
import {Form, Image, ProgressBar, Button, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
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
    }

    componentWillMount(){
        const {getProfile, getAllCourses} = this.props;
        getProfile();
        getAllCourses();
    }

    handleClickUpdate(){
        history.push('/update-profile');
    }

    handleClickDetail(user){
        history.push('/detail', user)
    }

    render(){
        const now = 60;
        const {address, salary} = this.state;
        const {userProfile, allCourses} = this.props;
        const user = Object.assign({}, userProfile);

        let listSkill;
        if(user.skills){
            listSkill = user.skills.map(item => 
                <div className="mb-1">
                    <Button variant="secondary" className="text-white" size="sm" disabled={true}>{item}</Button>
                </div>
            )
        }

        let listCourses
        if(allCourses){
            listCourses = allCourses.map((course, index)=> 
                <ListGroup className="list-group-flush">
                    <ListGroupItem>
                        <Card.Body>
                            <Card.Title>{course.nameCourse}</Card.Title>
                            <Card.Text>
                                <div>Tên người đăng việc: {course.fullName}</div>
                                <div>Email: {course.email}</div>
                                <div>Số điện thoại: {course.phoneNumber}</div>
                                <div>Địa chỉ: {course.address}</div>
                                <div>Giá/h: {course.salary}/h</div>
                                <div>Thời gian trong tuần: {course.time}</div>
                            </Card.Text>
        
                            <div>Mô tả: <span>{course.discribe}</span></div>
                            <div className="mt-2"><Button variant="primary" onClick={this.handleClickSubmitCourse}>Đăng kí dạy</Button></div>
                        </Card.Body>   
                    </ListGroupItem>
                </ListGroup>
            )
        } 

        return(
            <div>
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
                        <div className="col-md-7 mt-5">
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
            </div>
        );
    }
}
const mapStateToProps = state => ({
    userProfile: state.getProfile.userProfile,
    allCourses: state.getAllCourses.allCourses
})
const actionCreator = {
    getProfile: userActions.getProfile,
    getAllCourses: userActions.getAllCourses
}

export default connect(mapStateToProps, actionCreator)(TeacherHome);