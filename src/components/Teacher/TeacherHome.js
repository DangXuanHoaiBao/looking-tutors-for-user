import React from 'react';
import {Tab, Row, Col, Nav, Image, ProgressBar, Button, Card, ListGroup} from 'react-bootstrap';
import AllWork from './AllWork';
import userImg from '../../images/user-img.jpg';
import history from '../../helpers/history';

class TeacherHome extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        history.push('/teacher/update-info');
    }

    render(){
        const now = 60;

        return(
            <div className="container">
                <div className="row mt-4 mb-4">
                    <div className="col-md-9">
                        <Tab.Container id="left-tabs-example" defaultActiveKey="one">
                            <Row>
                                <Col sm={3}>
                                <div>Tìm Kiếm Công Việc Theo</div>
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item>
                                    <Nav.Link eventKey="one">Tất cả</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                    <Nav.Link eventKey="two">Mức Lương</Nav.Link>
                                    <Nav.Link eventKey="three">Chuyên Môn</Nav.Link>
                                    <Nav.Link eventKey="four">Khu Vực</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                </Col>
                                <Col sm={9}>
                                <Tab.Content className='shadow'>
                                    <Tab.Pane eventKey="one">
                                        <AllWork />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="two">
                                    
                                    </Tab.Pane>
                                </Tab.Content>
                                </Col>
                            </Row>
                            </Tab.Container>
                    </div>
                   
                    <div className="col-md-3">
                        <div className="row">
                            <div className="col-md-5"><Image src={userImg} fluid roundedCircle/></div>
                            <div> Thông Tin </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <div><i className="fas fa-user-alt mr-2"></i>Họ tên</div>
                                <div><i class="fas fa-envelope mr-2"></i>Email</div>
                                <div><i class="fa fa-home mr-2"></i>Địa chỉ</div>
                                <div><i class="fas fa-phone-square mr-2"></i>Số điện thoại</div>
                                <div>Tỉ lệ thành công</div>
                                <ProgressBar now={now} label={`${now}%`} />
                                <div>Tỉ lệ đánh giá từ người học</div>
                                <ProgressBar now={now} label={`${now}%`} />

                                <Card className="mt-2">
                                    <Card.Header>Giới thiệu</Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            Cập nhật bài tự giới thiệu của người dạy, cập nhật bài tự giới thiệu của người dạy
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                                <div><i class="fa fa-cogs mr-1" aria-hidden="true"></i> Kĩ năng</div>
                                <div>Toán cấp 3</div>
                                <div>Lý cấp 3</div>
                                <div>Hóa cấp 3</div>
                                <Button className="mt-2" variant="primary" onClick={this.handleClick}>Cập nhật thông tin</Button>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        );
    }

}

export default TeacherHome;