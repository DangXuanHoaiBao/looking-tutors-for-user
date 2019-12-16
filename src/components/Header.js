import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import userActions from '../actions/user';

import logo from '../images/logo.PNG';

class Header extends React.Component{
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        const {logout} = this.props;
        logout();
    }

    render(){
        const {data} = this.props;
        return (
            <Navbar bg="dark" expand="lg">

                {!data ?
                    <div className="container">
                        <Navbar.Brand> 
                            <Link to="/">  
                                <Image src={logo} roundedCircle className="logo"></Image>
                            </Link> 
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="white ml--270">
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-info">Search</Button>
                            </Form>
                            <Nav className="ml-auto">
                                <Link to="/login" className=" mr-3"> Đăng Nhập </Link>
                                <Link to="/sign-up" className=" mr-3"> Đăng Ký </Link>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                :
                    
                    <div className="container">
                        <Navbar.Brand> 
                            <Link to="/teacher">  
                                <Image src={logo} roundedCircle className="logo"></Image>
                            </Link> 
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="white ml--270">
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                <Button variant="outline-info">Search</Button>
                            </Form>
                            <div className="ml-auto" >
                            <Button onClick={this.handleClick} variant="outline-info">Đăng Xuất</Button>
                            </div>
                        </Navbar.Collapse>
                    </div>
                }
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