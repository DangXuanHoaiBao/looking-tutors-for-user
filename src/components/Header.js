import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Image, DropdownButton, Dropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import userActions from '../actions/user';
import history from '../helpers/history';
import UserBox from './UserBox'
import logo2 from '../images/logo.PNG';

class Header extends React.Component{
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        const {logout} = this.props;
        logout();
        history.push('/');
    }

    render(){
        const {data} = this.props;
        if(data)
            console.log(data)
        return (
            <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark" >
                <Navbar.Brand> 
                    <Link to="/">  
                        <Image src={logo2} roundedCircle className="logo"></Image>
                    </Link> 
                  
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav"  className="white ml--270">
                    <Form inline>
                        <FormControl type="text" placeholder="Môn học / gia sư..." className="mr-sm-2" />
                        <Button variant="outline-info">Tìm kiếm</Button>
                    </Form>
                    <Nav className="ml-auto">
                        <Link className="mr-5" to="/">Toán</Link>
                        <Link className="mr-5" to="/">Lý</Link>
                        <Link className="mr-5" to="/">Hóa</Link>
                        <Link className="mr-5" to="/">Ngữ Văn</Link>
                        <Link className="mr-5" to="/">Lịch Sử</Link>
                        <Link className="mr-5" to="/">Địa Lý</Link>
                        <Link className="" to="/">Anh Văn</Link>
                    </Nav>
                    {!data && 
                     <Nav className="ml-auto">
                        <Link to="/login">
                            <Button className="custom-button" variant="outline-info">
                                Đăng nhập
                            </Button>
                        </Link>
                        <Link to="/sign-up">
                            <Button className="custom-button" variant="outline-info">
                                Đăng ký
                            </Button>
                        </Link>
                     </Nav>
                    }
                    {data && 
                        <Nav className="ml-auto">
                            <UserBox />
                        </Nav>
                    }
                
            </Navbar.Collapse>
          </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    data: state.login.data
});

const actionCreator = {
    logout: userActions.logout
}

export default connect(mapStateToProps, actionCreator)(Header);