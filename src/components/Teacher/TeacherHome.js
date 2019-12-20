import React from 'react';
import {Tab, Row, Col, Nav, Image, ProgressBar, Button, Card, ListGroup} from 'react-bootstrap';
import {connect} from 'react-redux';
import AllWork from './AllWork';
import history from '../../helpers/history';
import Header from '../Header';
import Footer from '../Footer';
import userActions from '../../actions/user';

class TeacherHome extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount(){
        const {getProfile} = this.props;
        getProfile();
    }

    handleClick(){
        history.push('/update-profile');
    }

    render(){
        const now = 60;

        const {userProfile} = this.props;
        const user = Object.assign({}, userProfile);

        let listSkill;
        if(user.skills){
            listSkill = user.skills.map(item => 
                <div className="mb-1">
                    <Button variant="secondary" className="text-white" size="sm" disabled={true}>{item}</Button>
                </div>
            )
        }

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
                                <div className="col-md-4"><Image src={user.userImg} fluid roundedCircle/></div>
                                <div>
                                    <div className="font-weight-bold">{user.fullName}<span><i className="fas fa-check-circle text-primary"></i></span></div>
                                    <div><i className="fas fa-map-marker-alt text-primary"></i> &nbsp; <span>{user.address}</span></div>
                                    <span>{user.salary}/h</span>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-12">
                                    <div><i className="fas fa-envelope text-primary mr-2"></i>{user.email}</div>
                                    <div><i className="fas fa-phone-square text-primary mr-2"></i>{user.phoneNumber}</div>
                                    <p/>
                                    <div className="font-weight-bold">Tỉ lệ thành công</div>
                                    <ProgressBar now={now} label={`${now}%`} />
                                    <p/>
                                    <div className="font-weight-bold">Tỉ lệ đánh giá từ người học</div>
                                    <ProgressBar now={now} label={`${now}%`} />
                                    <p/>
                                    <Card className="mt-2">
                                        <Card.Header className="font-weight-bold">Giới thiệu</Card.Header>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                {user.discribe}
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                    <p/>
                                    <div className="font-weight-bold"><i className="fa fa-cogs text-primary mr-1" aria-hidden="true"></i> Kĩ năng</div>
                                    {listSkill}
                                    <p/>
                                    <Button className="mt-2" variant="primary" onClick={this.handleClick}>Cập nhật thông tin</Button>
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
const mapStateToProps = state => ({
    userProfile: state.getProfile.userProfile
})
const actionCreator = {
    getProfile: userActions.getProfile
}

export default connect(mapStateToProps, actionCreator)(TeacherHome);