import React from 'react';
import {Tab, Row, Col, Nav, Image, Button} from 'react-bootstrap';
import AllTeacher from './AllTeacher';
import userImg from '../../images/user-img.jpg';
import Header from '../Header';
import Footer from '../Footer';

class StudentHome extends React.Component{

    render(){

        return(
            <div>
                <Header/>
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
                                            <AllTeacher />
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
                                    <div><i className="fas fa-envelope mr-2"></i>Email</div>
                                    <div><i className="fa fa-home mr-2"></i>Địa chỉ</div>
                                    <div><i className="fas fa-phone-square mr-2"></i>Số điện thoại</div>
                                    <div>Tỉ lệ thành công</div>
                                    <Button className="mt-2" variant="primary" >Cập nhật thông tin</Button>
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


export default StudentHome;