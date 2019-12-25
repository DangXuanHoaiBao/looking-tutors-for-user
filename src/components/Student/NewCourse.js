import React from 'react';
import {Form, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import Header from '../Header';
import Footer from '../Footer';
import userActions from '../../actions/user';
import history from '../../helpers/history';

class NewCourse extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nameCourse: '',
            time: '',
            salary: null,
            address: '',
            discribe: '',
            errors: {
                nameCourse: '',
                salary: null,
                address: '',
                discribe: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        const {name, value} = e.target;
        let errors = {
            nameCourse: '',
            salary: null,
            address: '',
            discribe: ''
        }

        if(name === 'nameCourse'){
            errors.nameCourse = (value.length < 1 || value[0] === ' ') ? 'Tên khóa học không hợp lệ': '';
        }
        if(name === 'address'){
            errors.address = (value.length < 1 || value[0] === ' ') ? 'Địa chỉ không hợp lệ': '';
        }
        if(name === 'salary'){
            errors.salary = (value.length < 1 || isNaN(value) || value[0] === ' ') ? 'Tiền lương không hợp lệ': null;
        }
        if(name === 'discribe'){
            errors.discribe = (value.length < 1 || value[0] === ' ') ? 'Mô tả không hợp lệ': '';
        }
      
        this.setState({
            [name]: value,
            errors
        }) 
    }

    handleSubmit(e){
        e.preventDefault();
        const {nameCourse, time, address, salary, discribe, errors} = this.state;
        const {addNewCourse} = this.props;
        const ownerCourse = history.location.state;


        if(errors.nameCourse === '' && errors.address === '' && errors.salary === null && errors.discribe === '' && 
           discribe !== '' && salary !== null && nameCourse !== '' && address !== '')
        {
            const newCourse = {
                nameCourse,
                salary,
                time,
                address,
                discribe
            }
            addNewCourse(newCourse, ownerCourse);
        }
    }

    render(){
        const {nameCourse, time, salary, address, discribe, errors} = this.state;
        return(
            <div>
                <Header />
                <div className="container margin-top-6em">
                    <div className="row justify-content-center mt-4 mb-4" >
                        <div className='col-md-6 border border-dark shadow rounded'>
                            <div className="row justify-content-center">
                                <div className="col-md-10 mt-5 mb-5">
                                    <h3 className="mb-3">Thêm Khóa Học Mới</h3>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Form.Group controlId="formBasicName">
                                            <Form.Label>Tên khóa học</Form.Label>
                                            <Form.Control type="text" name="nameCourse" value={nameCourse} onChange={this.handleChange}/>
                                            <Form.Text className="text-danger">{errors.nameCourse}</Form.Text>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicTime">
                                            <Form.Label>Thời gian/Tuần</Form.Label>
                                            <Form.Control as="select" name="time" value={time} onChange={this.handleChange}>
                                                <option>1 Buổi</option>
                                                <option>2 Buổi</option>
                                                <option>3 Buổi</option>
                                            </Form.Control>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicSalary">
                                            <Form.Label>Giá/h</Form.Label>
                                            <Form.Control type="text" name="salary" value={salary}  onChange={this.handleChange}/>
                                            <Form.Text className="text-danger">{errors.salary}</Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicAddress">
                                            <Form.Label>Địa chỉ</Form.Label>
                                            <Form.Control type="text" name="address" value={address}  onChange={this.handleChange}/>
                                            <Form.Text className="text-danger">{errors.address}</Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicDiscribe">
                                            <Form.Label>Mô tả khóa học</Form.Label>
                                            <Form.Control type="text" name="discribe" value={discribe}  onChange={this.handleChange}/>
                                            <Form.Text className="text-danger">{errors.discribe}</Form.Text>
                                        </Form.Group>
                                        <Button className="w-100" variant="primary" type="submit">
                                            Thêm khóa học
                                        </Button>
                                    </Form>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )                              
    }
}
const actionCreator = {
    addNewCourse: userActions.addNewCourse
}
export default connect(null, actionCreator)(NewCourse);