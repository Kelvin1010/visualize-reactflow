import React, { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
    Button,
    Checkbox,
    Form,
    Input,
    Select,
} from 'antd';
import { Box, Text } from '@chakra-ui/react';
import { DoubleRightOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
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

function Login() {

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
    <div className='login'>
      <Box className='form-box'>
        <Box className='box-logo' />
        <Text className='title-box'>Sign In</Text>
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
                    {click === true && <Navigate to={'/visualize'} replace={true} />}
                    Submit to Login
                </Button>
                )}
            </Form.Item>
            <Form.Item wrapperCol={{offset: 10,span: 17,}} className='rgt'>
                <span>Don't have a account!&ensp;</span>
                <Link to={'/register'} className='link'>
                    <span>Sign Up</span>
                </Link>
            </Form.Item>
        </Form>
    </Box>
    </div>
  )
}

export default Login