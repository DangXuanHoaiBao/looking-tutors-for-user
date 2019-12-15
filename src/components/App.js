import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Image, Card} from 'react-bootstrap';
import { Router, Switch, Route, Link } from 'react-router-dom';
import {connect} from 'react-redux';
import history from '../helpers/history';
import userActions from '../actions/user';

import Login from "../components/Login";
import SignUp from '../components/SignUp';
import Home from '../components/Home';
import SettingAccount from '../components/SettingAccount';
import TeacherHome from '../components/Teacher/TeacherHome';
import TeacherProfile from '../components/Teacher/TeacherProfile';
import ClassDetail from '../components/ClassDetail';
import TeacherUpdate from '../components/Teacher/TeacherUpdate';

import '../styles/App.css';
import logo from '../images/logo.PNG';

class App extends React.Component{
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

    const {token} = this.props;
    
    return (
      <Router history={history}>
        <Navbar bg="dark" expand="lg">
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
              {!token ? 
                <Nav className="ml-auto">
                  <Link to="/login" className=" mr-3"> Đăng Nhập </Link>
                  <Link to="/sign-up" className=" mr-3"> Đăng Ký </Link>
                </Nav>
                :
                <div className="ml-auto" >
                <Button onClick={this.handleClick} variant="outline-info">Đăng Xuất</Button>
                </div>
              }
            </Navbar.Collapse>
          </div>
        </Navbar>

        <Switch>
          <Route exact path="/login"> <Login /> </Route>
          <Route exact path="/sign-up"> <SignUp /> </Route>
          <Route exact path="/setting-account"> <SettingAccount /> </Route>
          <Route exact path="/class-detail" > <ClassDetail /> </Route>

          <Route exact path="/teacher"> <TeacherHome /> </Route>
          <Route exact path="/teacher/profile" > <TeacherProfile /> </Route>
          <Route exact path="/teacher/update-profile"> <TeacherUpdate /> </Route>
          
          <Route exact path="/"> <Home /> </Route>

        </Switch>
        
        <Card bg="dark">
          <div className="container mt-3 mb-3 text-white">
            <div className="row mb-3">
              <div className="col-md-2 border-right">
                <Link to="/">
                  <Image src={logo} className="w-50" roundedCircle/>
                </Link>
              </div>
              <div className="col-md-5 border-right">
                <div className="font-weight-bold">Văn Phòng Công Ty</div>
                <div>Địa chỉ: 266-268 Lê Hồng Phong, phường 4, quận 5, Tp. HCM</div>
                <div>Số Fax: (028) 62 908 313</div>
              </div>
              <div className="col-md-5">
                <div className="font-weight-bold">Chi Nhánh</div>
                <div>Địa chỉ: Số 06 Lữ Gia, Phường 9, Đà Lạt, Lâm Đồng.</div>
                <div>Địa chỉ: Mai Chí Thọ, Phường 9, Quận 2, TPHCM</div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-2 border-right">
                <div className="font-weight-bold">Chứng nhận</div>
              </div>
              <div className="col-md-10">
                <div>Giấy chứng nhận đăng ký kinh doanh số: 0302029252 do Sở Kế hoạch đầu tư TPHCM
                    cấp ngày 08/03/2000 - MST: 0302029252
                    Người chịu trách nhiệm: Lê Đức Thành
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  token: state.login.token
});

const actionCreator = {
  logout: userActions.logout
}

export default connect(mapStateToProps, actionCreator)(App);
