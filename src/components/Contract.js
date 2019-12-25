import React from 'react';
import {Form, Button} from 'react-bootstrap';
import history from '../helpers/history';

class Contract extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            day: '',
            month: '',
            year: '',
            fullNameStudent: '',
            emailStudent: '',
            phoneNumberStudent: '',
            fullNameTeacher: '',
            emailTeacher: '',
            phoneNumberTeacher: ''

        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        const {student, course} = history.location.state;
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        if(student.email === course.emailRequestor){
            this.setState({
                day: dd,
                month: mm,
                year: yyyy,
                fullNameStudent: course.fullNameRequestor,
                emailStudent: course.emailRequestor,
                phoneNumberStudent: course.phoneNumberRequestor,
                fullNameTeacher: course.fullNameRequestedPerson,
                emailTeacher: course.emailRequestedPerson,
                phoneNumberTeacher: course.phoneNumberRequestedPerson,
                
            })
        }
        else{
            this.setState({
                day: dd,
                month: mm,
                year: yyyy,
                fullNameStudent: course.fullNameRequestedPerson,
                emailStudent: course.emailRequestedPerson,
                phoneNumberStudent: course.phoneNumberRequestedPerson,
                fullNameTeacher: course.fullNameRequestor,
                emailTeacher: course.emailRequestor,
                phoneNumberTeacher: course.phoneNumberRequestor
            })
        }
    }

    handleChange(){
        
    }

    render(){
        const {day, month, year, fullNameStudent, emailStudent, phoneNumberStudent, fullNameTeacher, emailTeacher, phoneNumberTeacher} = this.state;
        return(
            <div className="container margin-top-6em">
                <div className="row justify-content-center mt-4 mb-4" >
                    <div className='col-md-10 border border-dark shadow rounded'>
                        <div className="row justify-content-center">
                            <div className="col-md-11 mt-5 mb-5">
                                <div className="row justify-content-center"><div>Cộng Hòa Xã Hội Chủ Nghĩa Việt Nam</div></div>
                                <div className="row justify-content-center"><div>Đọc lập - Tự do - Hạnh phúc</div></div>
                                <div className="row  d-flex flex-row-reverse">
                                    <div>Năm <input className="w-10" name="year" value={year} onChange={this.handleChange}/></div>
                                    <div>Tháng <input className="w-10" name="month" value={month} onChange={this.handleChange}/></div> 
                                    <div>Ngày <input className="w-10" name="day" value={day} onChange={this.handleChange}/> </div> 
                                </div>
                                <div className="row justify-content-center"><h3 className="mb-3">Hợp Đồng Công Việc</h3></div>
                                <br/><br/>
                                <Form onSubmit={this.handleSubmit}>
                                    <div  className="row">
                                        <div className="col-md-6">
                                            <h5>Bên A (bên thuê):</h5>
                                            <Form.Group controlId="formBasicFullName">
                                                <Form.Label>Họ tên</Form.Label>
                                                <Form.Control type="text" name="fullNameStudent" value={fullNameStudent} onChange={this.handleChange}/>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" name="emailStudent" value={emailStudent}  onChange={this.handleChange}/>
                                                <Form.Text className="text-danger"></Form.Text>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPhoneNumber">
                                                <Form.Label>Số điện thoại</Form.Label>
                                                <Form.Control type="text" name="phoneNumberStudent" value={phoneNumberStudent} onChange={this.handleChange}/>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-6">
                                            <h5>Bên B (bên được thuê):</h5>
                                            <Form.Group controlId="formBasicFullName">
                                                <Form.Label>Họ tên</Form.Label>
                                                <Form.Control type="text" name="fullNameTeacher" value={fullNameTeacher} onChange={this.handleChange}/>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" name="emailTeacher" value={emailTeacher}  onChange={this.handleChange}/>
                                                <Form.Text className="text-danger"></Form.Text>
                                            </Form.Group>

                                            <Form.Group controlId="formBasicPhoneNumber">
                                                <Form.Label>Số điện thoại</Form.Label>
                                                <Form.Control type="text" name="phoneNumberTeacher" value={phoneNumberTeacher} onChange={this.handleChange}/>
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <br/>
                                    <h5>Thông tin thỏa thuận</h5>
                                    <br/>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Thời gian dạy</label>
                                        <div class="col-sm-10">
                                        <input type="text" class="form-control" id="2"/>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Giá mỗi giờ</label>
                                        <div class="col-sm-10">
                                        <input type="text" class="form-control" id="3"/>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Địa chỉ nơi dạy</label>
                                        <div class="col-sm-10">
                                        <input type="text" class="form-control" id="4"/>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-2 col-form-label">Mô tả</label>
                                        <div class="col-sm-10">
                                        <input type="text" class="form-control" id="5"/>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-4 col-form-label">Thời hạn kết thúc hợp đồng</label>
                                        <div class="col-sm-8">
                                        <input type="text" class="form-control" id="8"/>
                                        </div>
                                    </div>
                                    <h5>Nghĩa vụ bên A</h5>
                                    <div>
                                        <lu>
                                            <li>Thanh toán tiền thù lao đúng hạn.</li>
                                            <li>Bảo đảm điều kiện cơ sở vật chất cho việc dạy và học.</li>
                                            <li>Nhắc nhở người học học nghiêm túc, nghe lời người dạy.</li>
                                        </lu>
                                    </div>
                                    <br/>
                                    <h5>Nghĩa vụ bên B</h5>
                                    <div>
                                        <lu>
                                            <li>Đi dạy đúng giờ.</li>
                                            <li>Có giáo trình kế hoạch cụ thể.</li>
                                            <li>Bảo đảm đạt trình độ nhất định sau mỗi khóa học.</li>
                                        </lu>
                                    </div>
                                    <br/>
                                    <div className="row justify-content-center">                                     
                                        <Button className="w-200" variant="primary" type="submit">
                                            Chấp nhận
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Contract;