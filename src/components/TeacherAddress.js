import React from 'react';
import {Button, Card, Image, Carousel} from 'react-bootstrap';
import history from '../helpers/history';
import userActions from '../actions/user';
import { connect } from 'react-redux';

class TeacherAddress extends React.Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount(){
        const {getTeacherWithAddress, address} = this.props;
        getTeacherWithAddress(address);
    }

    handleClick(){
        history.push('/profile');
    }

    renderListUser(item, index){
        return(
        <div key={index} className="col-md-4">
            <Card className="shadow" style={{ height: '15rem' }}>
                <Card.Header className="bg-gray-300">
                    <div className="row">
                        <div className="col-md-3">
                            <Image src={item.userImg} className="img-fluid rounded-circle hoverable" alt="" />
                        </div>
                        <div className="col-md-9">
                            <div className="font-weight-bold">{item.fullName}<span><i className="fas fa-check-circle text-primary"></i></span></div>
                            <div className="text-success"> <i className="fas fa-crown"></i> <span>Top rated </span></div>
                        </div>
                        <div className="col-md-12">
                            <div>
                                <span>{item.salary}/h</span> 
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <i className="fas fa-map-marker-alt"></i> <span>{item.address}</span>
                            </div>
                        </div>
                    </div>
                </Card.Header>
                <Card.Body >
                    <Card.Text>
                        {
                            item.skills.map(skill => <Button variant="secondary" size="sm" disabled>{skill}</Button>)
                        }
                    </Card.Text>
                    <Button className="shadow" variant="primary" onClick={this.handleClick}> Thông Tin Chi Tiết </Button>
                </Card.Body>
            </Card>
        </div>
        )
    }

    render() {
        const {users} = this.props;
        let renderListUsers_1;
        let renderListUsers_2;
        if(users){
            renderListUsers_1 = users.slice(0, 3).map((item, index)=>
                this.renderListUser(item, index)
            )
            renderListUsers_2 = users.slice(3, 7).map((item, index)=>
                this.renderListUser(item, index)
            )
        }

        return (
            <div className="col-md-10">
                <Carousel className=" mt-3 mb-3">
                    <Carousel.Item>
                        <div className="container">
                            <div className="row mt-4">
                                {renderListUsers_1}
                            </div> 
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="container">
                            <div className="row mt-4">
                                {renderListUsers_2}
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.getTeacherWithAddress.users
})

const actionCreator = {
    getTeacherWithAddress: userActions.getTeacherWithAddress
}

export default connect(mapStateToProps, actionCreator)(TeacherAddress);