import React from 'react';
import {Image, Carousel, Navbar, Nav, Form, Button, Card, Pagination} from 'react-bootstrap';
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
            showTeacherSkill: false,
            currentPage: 0
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentWillMount(){
        const {getTeacherAll} = this.props;
        getTeacherAll();
    }

    handleChange(e){
        const {name, value} = e.target;
        if(name==="address"){
            if(value !== ""){
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
            else{
                const {getTeacherAll} = this.props;
                this.setState({
                    address: '',
                    salary: null,
                    skill: '',
                    showTeacherAddress: false,
                    showTeacherSalary: false,
                    showTeacherAll: true,
                    showTeacherSkill: false
                }) 
                getTeacherAll();
            }
        }
        if(name==="salary"){
            if(value === ""){
                const {getTeacherAll} = this.props;
                this.setState({
                    address: '',
                    skill: '',
                    salary: null,
                    showTeacherAddress: false,
                    showTeacherAll: true,
                    showTeacherSalary: false,
                    showTeacherSkill: false,
                    errorSalary: ''
                })
                getTeacherAll();
            }
            else if(!isNaN(value)){
                const {getTeacherWithSalary} = this.props;
                this.setState({
                    salary: value,
                    address: '',
                    skill: '',
                    showTeacherSalary: true,
                    showTeacherAddress: false,
                    showTeacherAll: false,
                    showTeacherSkill: false,
                    errorSalary: ''
                })
                getTeacherWithSalary(value);
            }
            else{
                this.setState({
                    address: '',
                    salary: null,
                    skill: '',
                    showTeacherAddress: false,
                    showTeacherSalary: false,
                    showTeacherAll: false,
                    showTeacherSkill: false,
                    errorSalary: "lương không hợp lệ"
                }) 
            }
        }
        if(name==="skill"){
            if(value !== ""){
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
            else{
                const {getTeacherAll} = this.props;
                this.setState({
                    address: '',
                    salary: null,
                    skill: '',
                    showTeacherAddress: false,
                    showTeacherSalary: false,
                    showTeacherAll: true,
                    showTeacherSkill: false
                }) 
                getTeacherAll();
            }
        }
        
    }

    handleChangePage(e){
        const numberPage =  Number(e.target.text) - 1;
        this.setState({
            currentPage: numberPage
        })
    }

    handleClick(teacher){
        history.push("/detail", teacher);
    }

    renderUser(teacher, index){
        return(
        <div key={index} className="col-md-4">
            <Card className="shadow" >
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
        const {showTeacherAll, showTeacherAddress, showTeacherSalary, 
               errorSalary, address, salary, skill, currentPage} = this.state;

        let renderListUsers_1;
        let renderListUsers_2;
        let items = [];
        if(showTeacherAll){
            const {teacherAll} = this.props;
            if(teacherAll){
                const numberPage = teacherAll.length / 6;
                let numberPageRounded = Math.round(numberPage);
                const temp = numberPage - numberPageRounded;
                if(temp > 0){
                    numberPageRounded = numberPageRounded + 1;
                }
                for (let i = 1; i <= numberPageRounded; i = i + 1){
                    if((currentPage + 1) === i){
                        items.push(<Pagination.Item key={i} active onClick={this.handleChangePage} >{i}</Pagination.Item>)
                    }
                    else{
                        items.push(<Pagination.Item key={i} onClick={this.handleChangePage} >{i}</Pagination.Item>)
                    }
                }
                renderListUsers_1 = teacherAll.slice(currentPage * 6, currentPage*6 + 3).map((teacher, index)=>
                this.renderUser(teacher, index)
                )
                renderListUsers_2 = teacherAll.slice(currentPage * 6 + 3, currentPage * 6 + 6).map((teacher, index)=>
                    this.renderUser(teacher, index)
                )
            }
        }
        else if(showTeacherAddress){
            const {teacherAddress} = this.props;
            if(teacherAddress){
                const numberPage = teacherAddress.length / 6;
                let numberPageRounded = Math.round(numberPage);
                const temp = numberPage - numberPageRounded;
                if(temp > 0){
                    numberPageRounded = numberPageRounded + 1;
                }
                for (let i = 1; i <= numberPageRounded; i = i + 1){
                    if((currentPage + 1) === i){
                        items.push(<Pagination.Item key={i} active onClick={this.handleChangePage} >{i}</Pagination.Item>)
                    }
                    else{
                        items.push(<Pagination.Item key={i} onClick={this.handleChangePage} >{i}</Pagination.Item>)
                    }
                }
                renderListUsers_1 = teacherAddress.slice(currentPage * 6, currentPage*6 + 3).map((teacher, index)=>
                    this.renderUser(teacher, index)
                )
                renderListUsers_2 = teacherAddress.slice(currentPage * 6 + 3, currentPage * 6 + 6).map((teacher, index)=>
                    this.renderUser(teacher, index)
                )
            }
        }
        else if(showTeacherSalary){
            const {teacherSalary} = this.props;
            if(teacherSalary){
                const numberPage = teacherSalary.length / 6;
                let numberPageRounded = Math.round(numberPage);
                const temp = numberPage - numberPageRounded;
                if(temp > 0){
                    numberPageRounded = numberPageRounded + 1;
                }
                for (let i = 1; i <= numberPageRounded; i = i + 1){
                    if((currentPage + 1) === i){
                        items.push(<Pagination.Item key={i} active onClick={this.handleChangePage} >{i}</Pagination.Item>)
                    }
                    else{
                        items.push(<Pagination.Item key={i} onClick={this.handleChangePage} >{i}</Pagination.Item>)
                    }
                }
                renderListUsers_1 = teacherSalary.slice(currentPage * 6, currentPage*6 + 3).map((teacher, index)=>
                this.renderUser(teacher, index)
                )
                renderListUsers_2 = teacherSalary.slice(currentPage * 6 + 3, currentPage * 6 + 6).map((teacher, index)=>
                    this.renderUser(teacher, index)
                )
            }
        }
        else{
            const {teacherSkill} = this.props;
            if(teacherSkill){
                const numberPage = teacherSkill.length / 6;
                let numberPageRounded = Math.round(numberPage);
                const temp = numberPage - numberPageRounded;
                if(temp > 0){
                    numberPageRounded = numberPageRounded + 1;
                }
                for (let i = 1; i <= numberPageRounded; i = i + 1){
                    if((currentPage + 1) === i){
                        items.push(<Pagination.Item key={i} active onClick={this.handleChangePage} >{i}</Pagination.Item>)
                    }
                    else{
                        items.push(<Pagination.Item key={i} onClick={this.handleChangePage} >{i}</Pagination.Item>)
                    }
                }
                renderListUsers_1 = teacherSkill.slice(currentPage * 6, currentPage*6 + 3).map((teacher, index)=>
                this.renderUser(teacher, index)
                )
                renderListUsers_2 = teacherSkill.slice(currentPage * 6 + 3, currentPage * 6 + 6).map((teacher, index)=>
                    this.renderUser(teacher, index)
                )
            }
        }
        const paginationBasic = (
            <div className="row justify-content-center mt-3">
                <Pagination size="sm" className="border">
                    {items}
                </Pagination>
            </div>
        );
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
                        <div className="col-md-10 ">
                            <div className="row mt-3">
                                {renderListUsers_1}
                            </div> 
                            <div className="row mt-3">
                                {renderListUsers_2}
                            </div>
                            {paginationBasic}
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