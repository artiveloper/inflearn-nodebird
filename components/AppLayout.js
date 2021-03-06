import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { Col, Input, Menu, Row } from 'antd'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import UserProfile from './UserProfile'
import LoginForm from './LoginForm'

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`

const AppLayout = ({ children }) => {
    const { me } = useSelector((state) => state.user)

    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>홈</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <SearchInput />
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {me ? <UserProfile />
                        : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://inflearn.com" target="_blank" rel="noreferrer noopener">made by artiveloper</a>
                </Col>
            </Row>
        </div>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout
