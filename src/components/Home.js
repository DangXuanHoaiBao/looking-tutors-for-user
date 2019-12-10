import React from 'react';
import {Button, Card, Image, Carousel, Navbar, Nav, Form} from 'react-bootstrap';
import {Link} from 'react-router-dom';

import userImg from '../images/user-img.jpg';
import logo from '../images/logo.PNG';
import banner_img_1 from '../images/banner-img-1.jpg';
import banner_img_3 from '../images/banner-img-3.jpg';
import history from '../helpers/history';

class Home extends React.Component{
    constructor(props){
        super(props);

	// 	this.state = {
	// 		index: 0,
	// 		direction: null,
    //     };
    //     this.handleSelect = this.handleSelect.bind(this);
    // }
    
	// handleSelect(selectedIndex, e) {
	// 	this.setState({
	// 		index: selectedIndex,
	// 		direction: e.direction,
    // 	});
        this.handleClick = this.handleClick.bind(this);

    }
    
    handleClick(){
        history.push('/teacher/profile');
    }

	render() {
        // const { index, direction } = this.state;
        
        return (
            <div>
                <Navbar bg="light">
                    <div className="container justify-content-center">
                    <Nav>
                        <Link className="mr-5" to="/">Toán</Link>
                        <Link className="mr-5" to="/">Lý</Link>
                        <Link className="mr-5" to="/">Hóa</Link>
                        <Link className="mr-5" to="/">Ngữ Văn</Link>
                        <Link className="mr-5" to="/">Lịch Sử</Link>
                        <Link className="mr-5" to="/">Địa Lý</Link>
                        <Link className="" to="/">Anh Văn</Link>
                    </Nav>
                    </div>
                </Navbar>

                <Carousel>
                    <Carousel.Item>
                    <Image
                        className="d-block w-100"
                        src={banner_img_1}
                        alt="First slide"
                    />
                    <Carousel.Caption className="mb-200">
                        <Image src ={logo} className="w-20 mb-4" alt="" roundedCircle/>
                        <h4>UBER CHO GIA SƯ</h4>
                        <h5>Thầy hay trò giỏi.</h5>
                        <div>Kết nối giữa người dạy và người học một cách nhanh nhất.</div>
                    </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Image
                        className="d-block w-100"
                        src={banner_img_3}
                        alt="Third slide"
                        />
                        <Carousel.Caption className="mb-200">
                        <Image src={logo} className="w-20 mb-4" alt="" roundedCircle/>
                        <h4>UBER CHO GIA SƯ</h4>
                        <h5>Thầy hay trò giỏi.</h5>
                        <div>Kết nối giữa người dạy và người học một cách nhanh nhất.</div>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

                <div className="container">
                    <div className="row mt-4 mb-4 ">
                        <div className="col-md-2">
                            <div className="mt-3 mb-3 font-weight-bold">Hiển Thị Theo:</div> 
                            <Form.Group controlId="formDistrict">
                                <i class="fas fa-map-marker-alt text-primary"></i> &nbsp;
                                <Form.Label className="">Địa Điểm</Form.Label>
                                <Form.Control as="select">
                                    <option>...</option>
                                    <option>TPHCM</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formDistrict">
                                <i class="fas fa-dollar-sign text-primary"></i> &nbsp;
                                <Form.Label className="">Giá Mỗi Giờ</Form.Label>
                                <Form.Control as="select">
                                    <option>...</option>
                                    <option>50.000</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formDistrict">
                                <i class="fa fa-cogs text-primary" aria-hidden="true"></i> &nbsp;
                                <Form.Label className="">Kĩ Năng</Form.Label>
                                <Form.Control as="select">
                                    <option>...</option>
                                    <option>Toán</option>
                                </Form.Control>
                            </Form.Group>
                        </div>
                        <div className="col-md-10">
                        <Carousel
                            // activeIndex={index}
                            // direction={direction}
                            // onSelect={this.handleSelect}
                            className=" mt-3 mb-3"
                        >
                            <Carousel.Item>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <Card className="shadow">
                                                <Card.Header className="bg-gray-300">
                                                    <div className="row ">
                                                        <div className="col-md-3">
                                                            <Image src={userImg} className="img-fluid rounded-circle hoverable user-img" alt="" />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <Card.Title > Họ Tên </Card.Title>
                                                        </div>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body >
                                                    <Card.Text>
                                                        Mô tả công việc
                                                        Các kĩ năng
                                                    </Card.Text>
                                                    <Button variant="success" onClick={this.handleClick}> Thông Tin Chi Tiết </Button>
                                                </Card.Body>
                                            </Card>
                                        </div>

                                        <div className="col-md-4">
                                            <Card className="shadow">
                                                <Card.Header className="bg-gray-300">
                                                    <div className="row ">
                                                        <div className="col-md-3">
                                                            <Image src={userImg} className="img-fluid rounded-circle hoverable user-img" alt="" />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <Card.Title > Họ Tên </Card.Title>
                                                        </div>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body >
                                                    <Card.Text>
                                                        Mô tả công việc
                                                        Các kĩ năng
                                                    </Card.Text>
                                                    <Button variant="success"> Thông Tin Chi Tiết </Button>
                                                </Card.Body>
                                            </Card>
                                        </div>

                                        <div className="col-md-4">
                                            <Card className="shadow">
                                                <Card.Header className="bg-gray-300">
                                                    <div className="row ">
                                                        <div className="col-md-3">
                                                            <Image src={userImg} className="img-fluid rounded-circle hoverable user-img" alt="" />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <Card.Title > Họ Tên </Card.Title>
                                                        </div>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body >
                                                    <Card.Text>
                                                        Mô tả công việc
                                                        Các kĩ năng
                                                    </Card.Text>
                                                    <Button variant="success"> Thông Tin Chi Tiết </Button>
                                                </Card.Body>
                                            </Card>
                                        </div>

                                        
                                    </div>  
                                    <div className="row mt-4">
                                        

                                        <div className="col-md-4">
                                            <Card className="shadow">
                                                <Card.Header className="bg-gray-300">
                                                    <div className="row ">
                                                        <div className="col-md-3">
                                                            <Image src={userImg} className="img-fluid rounded-circle hoverable user-img" alt="" />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <Card.Title > Họ Tên </Card.Title>
                                                        </div>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body >
                                                    <Card.Text>
                                                        Mô tả công việc
                                                        Các kĩ năng
                                                    </Card.Text>
                                                    <Button variant="success"> Thông Tin Chi Tiết </Button>
                                                </Card.Body>
                                            </Card>
                                        </div>

                                        <div className="col-md-4">
                                            <Card className="shadow">
                                                <Card.Header className="bg-gray-300">
                                                    <div className="row ">
                                                        <div className="col-md-3">
                                                            <Image src={userImg} className="img-fluid rounded-circle hoverable user-img" alt="" />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <Card.Title > Họ Tên </Card.Title>
                                                        </div>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body >
                                                    <Card.Text>
                                                        Mô tả công việc
                                                        Các kĩ năng
                                                    </Card.Text>
                                                    <Button variant="success"> Thông Tin Chi Tiết </Button>
                                                </Card.Body>
                                            </Card>
                                        </div>

                                        <div className="col-md-4">
                                            <Card className="shadow">
                                                <Card.Header className="bg-gray-300">
                                                    <div className="row ">
                                                        <div className="col-md-3">
                                                            <Image src={userImg} className="img-fluid rounded-circle hoverable user-img" alt="" />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <Card.Title > Họ Tên </Card.Title>
                                                        </div>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body >
                                                    <Card.Text>
                                                        Mô tả công việc
                                                        Các kĩ năng
                                                    </Card.Text>
                                                    <Button variant="success"> Thông Tin Chi Tiết </Button>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>          
                                </div>  
                            </Carousel.Item>
                            <Carousel.Item>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <Card className="shadow">
                                                <Card.Header className="bg-gray-300">
                                                    <div className="row ">
                                                        <div className="col-md-3">
                                                            <Image src={userImg} className="img-fluid rounded-circle hoverable user-img" alt="" />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <Card.Title > Họ Tên </Card.Title>
                                                        </div>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body >
                                                    <Card.Text>
                                                        Mô tả công việc
                                                        Các kĩ năng
                                                    </Card.Text>
                                                    <Button variant="success"> Thông Tin Chi Tiết </Button>
                                                </Card.Body>
                                            </Card>
                                        </div>

                                        <div className="col-md-4">
                                            <Card className="shadow">
                                                <Card.Header className="bg-gray-300">
                                                    <div className="row ">
                                                        <div className="col-md-3">
                                                            <Image src={userImg} className="img-fluid rounded-circle hoverable user-img" alt="" />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <Card.Title > Họ Tên </Card.Title>
                                                        </div>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body >
                                                    <Card.Text>
                                                        Mô tả công việc
                                                        Các kĩ năng
                                                    </Card.Text>
                                                    <Button variant="success"> Thông Tin Chi Tiết </Button>
                                                </Card.Body>
                                            </Card>
                                        </div>

                                        <div className="col-md-4">
                                            <Card className="shadow">
                                                <Card.Header className="bg-gray-300">
                                                    <div className="row ">
                                                        <div className="col-md-3">
                                                            <Image src={userImg} className="img-fluid rounded-circle hoverable user-img" alt="" />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <Card.Title > Họ Tên </Card.Title>
                                                        </div>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body >
                                                    <Card.Text>
                                                        Mô tả công việc
                                                        Các kĩ năng
                                                    </Card.Text>
                                                    <Button variant="success"> Thông Tin Chi Tiết </Button>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>        
                                    <div className="row mt-4">
                                        <div className="col-md-4">
                                            <Card className="shadow">
                                                <Card.Header className="bg-gray-300">
                                                    <div className="row ">
                                                        <div className="col-md-3">
                                                            <Image src={userImg} className="img-fluid rounded-circle hoverable user-img" alt="" />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <Card.Title > Họ Tên </Card.Title>
                                                        </div>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body >
                                                    <Card.Text>
                                                        Mô tả công việc
                                                        Các kĩ năng
                                                    </Card.Text>
                                                    <Button variant="success"> Thông Tin Chi Tiết </Button>
                                                </Card.Body>
                                            </Card>
                                        </div>

                                        <div className="col-md-4">
                                            <Card className="shadow">
                                                <Card.Header className="bg-gray-300">
                                                    <div className="row ">
                                                        <div className="col-md-3">
                                                            <Image src={userImg} className="img-fluid rounded-circle hoverable user-img" alt="" />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <Card.Title className=""> Họ Tên </Card.Title>
                                                        </div>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body >
                                                    <Card.Text>
                                                        Mô tả công việc
                                                        Các kĩ năng
                                                    </Card.Text>
                                                    <Button variant="success"> Thông Tin Chi Tiết </Button>
                                                </Card.Body>
                                            </Card>
                                        </div>

                                        <div className="col-md-4">
                                            <Card className="shadow">
                                                <Card.Header className="bg-gray-300">
                                                    <div className="row ">
                                                        <div className="col-md-3">
                                                            <Image src={userImg} className="img-fluid rounded-circle hoverable user-img" alt="" />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <Card.Title className=""> Họ Tên </Card.Title>
                                                        </div>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body >
                                                    <Card.Text>
                                                        Mô tả công việc
                                                        Các kĩ năng
                                                    </Card.Text>
                                                    <Button variant="success"> Thông Tin Chi Tiết </Button>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>          
                                </div>  
                            </Carousel.Item>
                        </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;