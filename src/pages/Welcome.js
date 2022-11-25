import { Box } from '@chakra-ui/react'
import React, { useState } from 'react';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link, Navigate } from 'react-router-dom';

function Welcome() {

    const [loadings, setLoadings] = useState([]);
    const [click, setClick] = useState(false);

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

    return (
        <div className='welcome'>
            <Box className='welcome-center'>
                <h1>Welcome Visualize App</h1>
                <Button
                    type="primary"
                    icon={<DoubleRightOutlined />}
                    loading={loadings[1]}
                    onClick={() => handleEnterLoading(1)}
                    size='large'
                    className='click-welcome'
                >
                    {click === true && <Navigate to={'/login'} replace={true} />}
                    Click To Continue!
                </Button>
                <div className='dont-account'>
                    <span>Don't have a account!&ensp;</span>
                    <Link to={'/register'} className='link'>
                        <span>Sign Up</span>
                    </Link>
                </div>
            </Box>
        </div>
    )
}

export default Welcome