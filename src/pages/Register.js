import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { DoubleRightOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Link, Navigate } from 'react-router-dom';
import {
    Button,
    Form,
    Input,
    Select,
  } from 'antd';
const { Option } = Select;

const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
};

function Register() {

    const [loadings, setLoadings] = useState([]);
    const [click, setClick] = useState(false);
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({});

    // To disable submit button at the beginning.
    useEffect(() => {
      forceUpdate({});
    }, []);
    

    const handleEnterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
            setClick(true)
        }, 3000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        console.log(value)
    };
    

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='register'>
            <Box className='form-box'>
                <Box className='box-logo' />
                <Text className='title-box'>Sign Up</Text>
                <Form 
                    {...formItemLayout}
                    name="basic" 
                    form={form}
                    labelCol={{span: 10}} 
                    wrapperCol={{span: 30}}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="nickname"
                        label="Nickname"
                        tooltip="What do you want others to call you?"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your nickname!',
                            whitespace: true,
                        },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} onChange={handleChange}/>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                        ]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} onChange={handleChange}/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                        hasFeedback
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} onChange={handleChange}/>
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} onChange={handleChange}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 10,span: 17,}} shouldUpdate>
                        {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<DoubleRightOutlined />}
                            loading={loadings[1]}
                            onClick={() => handleEnterLoading(1)}
                            size='large'
                            className='click-welcome'
                            disabled={
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }
                        >
                            {click === true && <Navigate to={'/login'} replace={true} />}
                            Submit to Register
                        </Button>
                        )}
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 10,span: 17,}} className='rgt'>
                        <span>Have a account!&ensp;</span>
                        <Link to={'/login'} className='link'>
                            <span>Sign In</span>
                        </Link>
                    </Form.Item>
                </Form>
            </Box>
        </div>
    )
}

export default Register