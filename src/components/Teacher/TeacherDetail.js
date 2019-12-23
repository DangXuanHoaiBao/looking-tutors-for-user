import React from 'react';
import {Image, Card, ListGroup, Button} from 'react-bootstrap';
import history from '../../helpers/history';

class TeacherProfile extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        history.push('/class-detail');
    }

    render(){
        const teacher = history.location.state;
        let listSkill;
        if(teacher.skills){
            listSkill = teacher.skills.map((skill, index) => {
                return <Button key={index} variant="secondary" disabled >{skill}</Button>
            })
        }
       
        return (
            <div className="container"> 
                <div className="row mt-4 mb-4">
                    <div className="col-md-12 border shadow">
                        <div className="row mt-3">
                            <div className="col-md-1">
                                <Image src={teacher.userImg} className="img-fluid rounded-circle" />
                            </div>
                            <div className="col-md-11 ml--20 ">
                                <div className="font-weight-bold">{teacher.fullName} <span><i className="fas fa-check-circle text-primary"></i></span></div>
                                <i className="fas fa-map-marker-alt text-primary"></i> &nbsp; <span>{teacher.address}</span>
                            </div>
                        </div>
                        <div className="row mt-3 mb-3 ml-1 mr-1">
                            <div className="col-md-12">
                                <div className="row">
                                    <Card.Body>
                                        <Card.Text>
                                            {teacher.discribe}
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
                </div>

                <div className="row mb-3">
                    <Card className="col-md-12 shadow">
                        <Card.Header className="font-weight-bold">Danh sách lớp học đang được yêu cầu dạy</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Card.Body>
                                    <Card.Title>Toán luyện thi đại học</Card.Title>
                                    <Card.Text>
                                        
                                    </Card.Text>
                                    <Button variant="primary" onClick = {this.handleClick}>Chi Tiết Lớp</Button> &nbsp;
                                    <Button variant="primary">Chấp Nhận</Button>
                                </Card.Body>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>

                <div className="row mb-3">
                    <Card className="col-md-12 shadow">
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

                <div className="row mb-3">
                    <Card className="col-md-12 shadow">
                        <Card.Header className="font-weight-bold">Chuyên Môn</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Card.Body>
                                    {listSkill}
                                </Card.Body>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>
            </div>
        );
    }
}

export default TeacherProfile;