import React from 'react';
import {Form, Button} from 'react-bootstrap';

const Login = () =>{
    return (
        <div className="container ">
            <div className="row justify-content-center mt-4 mb-4" >
                <div className='col-md-6 border border-dark shadow rounded'>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5 mb-5">
                            <h3 className="mb-3">Đăng Nhập Tài Khoản</h3>
                            <Form >
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Nhập email" />
                                    <Form.Text className="text-muted">
                                    
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Mật Khẩu</Form.Label>
                                    <Form.Control type="password" placeholder="Nhập mật khẩu" />
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Ghi nhớ tài khoản" />
                                </Form.Group>
                                <Button className="w-100" variant="primary" type="submit">
                                    Đăng Nhập
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;