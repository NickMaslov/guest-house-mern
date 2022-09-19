import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { Row, Col, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import DefaultLayout from '../components/DefaultLayout';
AOS.init();

function Login() {
    const dispatch = useDispatch();
    function onFinish(values) {
        dispatch(userLogin(values));
        console.log(values);
    }

    return (
        <DefaultLayout>
            <div className='login'>
                <Row gutter={16} className='d-flex align-items-center'>
                    <Col lg={16} style={{ position: 'relative' }}>
                        <img
                            className='w-100'
                            data-aos='slide-right'
                            data-aos-duration='1500'
                            src={'assets/home.webp'}
                            alt=''
                        />
                        <h1 className='login-logo'>GUEST HOUSE</h1>
                    </Col>
                    <Col lg={8} className='text-left p-5'>
                        <Form
                            layout='vertical'
                            className='login-form p-5'
                            onFinish={onFinish}
                        >
                            <h1>Login</h1>
                            <hr />
                            <Form.Item
                                name='username'
                                label='Username'
                                rules={[{ required: true }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name='password'
                                label='Password'
                                rules={[{ required: true }]}
                            >
                                <Input type='password' />
                            </Form.Item>

                            <button className='btn1 mt-2'>Login</button>

                            <hr />

                            <Link to='/register'>Click Here to Register</Link>
                        </Form>
                    </Col>
                </Row>
            </div>
        </DefaultLayout>
    );
}

export default Login;
