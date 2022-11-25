import { Col, Row } from 'antd'
import React from 'react'

function Header() {
    return (
        <div className='header'>
            <Row>
                <Col span={8}>8</Col>
                <Col span={8}>8</Col>
                <Col span={8}>8</Col>
            </Row>
        </div>
    )
}

export default Header