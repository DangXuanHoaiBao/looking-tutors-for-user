import React from 'react';
import {Image, Card, ListGroup, Button} from 'react-bootstrap';
import history from '../../helpers/history';
import userActions from '../../actions/user';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

class StudentDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            contract: null
        }
        this.handleClickAccept = this.handleClickAccept.bind(this);
        this.handleToken = this.handleToken.bind(this);
        this.handleClickCheckout = this.handleClickCheckout.bind(this);
    }

    handleClickCheckout(contract){
        this.setState({
            contract
        })
    }

    handleToken(token){
        const { checkout } = this.props;
        const {contract} = this.state;
        checkout(token, contract);
    }

    componentWillMount(){
        const {studentGetAllCoursesRequestingReceivedTeach, studentGetAllContract} = this.props;
        const student = history.location.state;
        studentGetAllCoursesRequestingReceivedTeach(student);
        studentGetAllContract(student);
    }
    
    handleClickAccept(student, course){
        const arrayObject = {student, course}
        history.push('/create-contract', arrayObject)
    }

    render(){
        const student = history.location.state;
        const {allCoursesRequestingReceivedTeach, allContract} = this.props;
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
       
        let listContract;
        if(allContract){
            listContract = allContract.map(contract => 
                <ListGroup.Item>
                    <Card.Body>
                        <Card.Text>
                            <div className="row">
                                <div className="mt-2">  
                                    <h5 className="mb-1">Thông tin hợp đồng</h5>    
                                    <div className="ml-3">
                                        <div>Id: {contract._id}</div>
                                        <div>Ngày tạo: {contract.day}/<span>{contract.month}/</span><span>{contract.year}</span></div>
                                        <div>Bên người học:</div>
                                        <div>Họ tên: {contract.funllNameStudent}</div>
                                        <div>Email: {contract.emailStudent}</div>
                                        <div>Số điện thoại: {contract.phoneNumberStudent}</div>
                                        <div>Bên người dạy: </div>
                                        <div>Họ tên: {contract.fullNameTeacher}</div>
                                        <div>Email: {contract.emailTeacher}</div>
                                        <div>Số điện thoại: {contract.phoneNumberTeacher}</div>
                                        <div>Số thời lượng dạy trong tuần: {contract.teachTime}</div>
                                        <div>Địa chỉ: {contract.address}</div>
                                        <div>Giá: {contract.salary}</div>
                                        <div>Mô tả: {contract.discribe}</div>
                                        <div>Thời hạn hợp đồng: {contract.term}</div>
                                        {contract.acceptTeacher ?  <StripeCheckout disabled={contract.checkout}
                                                                    stripeKey='pk_test_RknGlS5ASjG2BGAygpTfcRh700UlGTyYsI'
                                                                    amount = {2500}  
                                                                    token = {this.handleToken}><Button disabled={contract.checkout} onClick= {()=> this.handleClickCheckout(contract)}>Thanh Toán</Button></StripeCheckout> : <Button disabled>Chờ người dạy chấp nhận hợp đồng</Button>}
                                    </div>
                                </div>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </ListGroup.Item>
            )
        }
       

        return (
            <div>
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

                    <div className="row mb-3">
                        <div className="col-md-12">
                            <Card className="shadow">
                                <Card.Header className="font-weight-bold">Danh sách hợp đồng được tạo</Card.Header>
                                <ListGroup>
                                    {listContract}
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
    allCoursesRequestingReceivedTeach: state.studentGetAllCoursesRequestingReceivedTeach.allCoursesRequestingReceivedTeach,
    allContract: state.studentGetAllContract.allContract
})

const actionCreator = {
    studentGetAllCoursesRequestingReceivedTeach: userActions.studentGetAllCoursesRequestingReceivedTeach,
    studentGetAllContract: userActions.studentGetAllContract,
    checkout: userActions.checkout
}

export default connect(mapStateToProps, actionCreator)(StudentDetail);