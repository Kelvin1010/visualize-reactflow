import { Button, Col, Row } from 'antd'
import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

function Header() {

    const [click, setClick] = useState(false);

    const handleNavigate = () => {
        setClick(true)
    }
    const user = true;

    return (
        <div className='header'>
            <Row className='header-main'>
                <Col span={8} className='header-left'>
                    <div className='header-left-icon'>
                    </div>
                    <h1>
                        Data Analytics
                    </h1>
                </Col>
                <Col span={16} className='header-right'>
                    {user ? (
                        <Button type="primary" ghost onClick={()=>handleNavigate()}>
                            {click === true && <Navigate to={'/login'} replace={true} />}
                            Sign In
                        </Button>
                    ):(
                        <Button type="primary" ghost onClick={()=>handleNavigate()}>
                            {click === true && <Navigate to={'/register'} replace={true} />}
                            Sign Up
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    )
}

export default Header