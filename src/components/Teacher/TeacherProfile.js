import React from 'react';
import {Image, Card, ListGroup, Button} from 'react-bootstrap';
import history from '../../helpers/history';

import user_img from '../../images/user-img.jpg';

class TeacherProfile extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        history.push('/class-detail');
    }

    render(){
        return (
            <div className="container"> 
                <div className="row mt-4 mb-4">
                    <div className="col-md-12 border shadow">
                        <div className="row mt-3">
                            <div className="col-md-1">
                                <Image src={user_img} className="img-fluid rounded-circle" />
                            </div>
                            <div className="col-md-11 ml--20 ">
                                <div className="font-weight-bold">Bao Dang <span><i class="fas fa-check-circle text-primary"></i></span></div>
                                <i class="fas fa-map-marker-alt text-primary"></i> &nbsp; <span>Quận 5, TPHCM</span>
                            </div>
                        </div>
                        <div className="row mt-3 mb-3 ml-1 mr-1">
                            <div className="col-md-12">
                                <div className="row">
                                    <Card.Body>
                                        <Card.Text>
                                            Báo Mới là một trang web tổng hợp tin tức tự động và thông minh được xây dựng bởi ePi Technologies, 
                                            đứng đầu là Nguyễn Anh Tuấn.
                                            Mỗi ngày Báo Mới xử lý hơn 6000 tin tức từ ~100 báo điện tử ở Việt Nam
                                        </Card.Text>
                                    </Card.Body>
                                </div>
                                <div className="row">
                                    <div className="col-md-2">
                                        Giá/h
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
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
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
                                    <Button className="" disabled variant="secondary">Toán</Button> &emsp;
                                    <Button disabled variant="secondary">Lý</Button> &emsp;
                                    <Button disabled variant="secondary">Hóa</Button> 
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