import React from 'react';
import {Image, Carousel, Navbar, Nav, Form, Button, Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import userActions from '../actions/user';
import logo from '../images/logo.PNG';
import banner_img_1 from '../images/banner-img-1.jpg';
import banner_img_3 from '../images/banner-img-3.jpg';
import history from '../helpers/history';
import '../styles/App.css';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            address: '',
            salary: null,
            skill: '',
            errorSalary: '',
            showTeacherAddress: false,
            showTeacherSalary: false,
            showTeacherAll: true,
            showTeacherSkill: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount(){
        const {getTeacherAll} = this.props;
        getTeacherAll();
    }

    handleChange(e){
        const {name, value} = e.target;
        if(name==="address"){
            const {getTeacherWithAddress} = this.props;
            this.setState({
                address: value,
                salary: null,
                skill: '',
                showTeacherAddress: true,
                showTeacherSalary: false,
                showTeacherAll: false,
                showTeacherSkill: false
            }) 
            getTeacherWithAddress(value);
        }
        if(name==="salary"){
            let errorSalary;
            if(isNaN(value)){
                const errorSalary = 'lương không hợp lệ';
                this.setState({
                    address: '',
                    skill: '',
                    showTeacherAddress: false,
                    showTeacherAll: false,
                    showTeacherSalary: false,
                    showTeacherSkill: false,
                    errorSalary
                })
            }
            else{
                const {getTeacherWithSalary} = this.props;
                errorSalary = '';
                this.setState({
                    salary: value,
                    address: '',
                    skill: '',
                    showTeacherSalary: true,
                    showTeacherAddress: false,
                    showTeacherAll: false,
                    showTeacherSkill: false,
                    errorSalary
                })
                getTeacherWithSalary(value);
            }
        }
        if(name==="skill"){
            const {getTeacherWithSkill} = this.props;
            this.setState({
                skill: value,
                salary: null,
                address: '',
                showTeacherSkill: true,
                showTeacherSalary: false,
                showTeacherAddress: false,
                showTeacherAll: false
            })
            getTeacherWithSkill(value);
        }
        
    }

    handleClick(teacher){
        const teacherStringJson = JSON.stringify(teacher);
        history.push(`/profile/:${teacherStringJson}`);
    }

    renderListUser(teacher, index){
        return(
        <div key={index} className="col-md-4">
            <Card className="shadow" style={{ height: '15rem' }}>
                <Card.Header className="bg-gray-300">
                    <div className="row">
                        <div className="col-md-3">
                            <Image src={teacher.userImg} className="img-fluid rounded-circle hoverable" alt="" />
                        </div>
                        <div className="col-md-9">
                            <div className="font-weight-bold">{teacher.fullName}<span><i className="fas fa-check-circle text-primary"></i></span></div>
                            <div className="text-success"> <i className="fas fa-crown"></i> <span>Top rated </span></div>
                        </div>
                        <div className="col-md-12">
                            <div>
                                <span>{teacher.salary}/h</span> 
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <i className="fas fa-map-marker-alt"></i> <span>{teacher.address}</span>
                            </div>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body >
                    <Card.Text>
                        {
                            teacher.skills.map(skill => <Button variant="secondary" size="sm" disabled>{skill}</Button>)
                        }
                    </Card.Text>
                    <Button className="shadow" variant="primary" onClick={()=> this.handleClick(teacher)}> Thông Tin Chi Tiết </Button>
                </Card.Body>
            </Card>
        </div>
        )
    }

	render() {
        const {showTeacherAll, showTeacherAddress, showTeacherSalary, showTeacherSkill, errorSalary, address, salary, skill} = this.state;
        let renderListUsers_1;
        let renderListUsers_2;
        if(showTeacherAll){
            const {teacherAll} = this.props;
            if(teacherAll){
                renderListUsers_1 = teacherAll.slice(0, 3).map((teacher, index)=>
                    this.renderListUser(teacher, index)
                )
                renderListUsers_2 = teacherAll.slice(3, 7).map((teacher, index)=>
                    this.renderListUser(teacher, index)
                )
            }
        }
        else if(showTeacherAddress){
            const {teacherAddress} = this.props;
            if(teacherAddress){
                renderListUsers_1 = teacherAddress.slice(0, 3).map((teacher, index)=>
                    this.renderListUser(teacher, index)
                )
                renderListUsers_2 = teacherAddress.slice(3, 7).map((teacher, index)=>
                    this.renderListUser(teacher, index)
                )
            }
        }
        else if(showTeacherSalary){
            const {teacherSalary} = this.props;
            if(teacherSalary){
                renderListUsers_1 = teacherSalary.slice(0, 3).map((teacher, index)=>
                    this.renderListUser(teacher, index)
                )
                renderListUsers_2 = teacherSalary.slice(3, 7).map((teacher, index)=>
                    this.renderListUser(teacher, index)
                )
            }
        }
        else if(showTeacherSkill){
            const {teacherSkill} = this.props;
            if(teacherSkill){
                renderListUsers_1 = teacherSkill.slice(0, 3).map((teacher, index)=>
                    this.renderListUser(teacher, index)
                )
                renderListUsers_2 = teacherSkill.slice(4, 7).map((teacher, index)=>
                    this.renderListUser(teacher, index)
                )
            }
        }

        return (
            <div>
                <Header/>
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
                                    <Form.Text className="text-danger">{errorSalary}</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formDistrict">
                                <i className="fa fa-cogs text-primary" aria-hidden="true"></i> &nbsp;
                                <Form.Label className="">Kĩ Năng</Form.Label>
                                    <Form.Control as="select" name="skill" value={skill} onChange={this.handleChange}>
                                        <option></option>
                                        <option>Toán</option>
                                    </Form.Control>
                            </Form.Group>
                        </div>
                        <div className="col-md-10">
                            <Carousel className=" mt-3 mb-3">
                                <Carousel.Item>
                                    <div className="container">
                                        <div className="row mt-4">
                                            {renderListUsers_1}
                                        </div> 
                                        <div className="row mt-4">
                                            {renderListUsers_2}
                                        </div>
                                    </div>
                                </Carousel.Item>
                                {/* <Carousel.Item>
                                    <div className="container">
                                        <div className="row mt-4">
                                            {renderListUsers_2}
                                        </div>
                                    </div>
                                </Carousel.Item> */}
                            </Carousel>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    teacherAll: state.getTeacherAll.teacherAll,
    teacherAddress: state.getTeacherWithAddress.teacherAddress,
    teacherSalary: state.getTeacherWithSalary.teacherSalary,
    teacherSkill: state.getTeacherWithSkill.teacherSkill
})

const actionCreator = {
    getTeacherAll: userActions.getTeacherAll,
    getTeacherWithAddress: userActions.getTeacherWithAddress,
    getTeacherWithSalary: userActions.getTeacherWithSalary,
    getTeacherWithSkill: userActions.getTeacherWithSkill
}

export default connect(mapStateToProps, actionCreator)(Home);