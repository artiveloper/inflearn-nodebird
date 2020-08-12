import React, { useState, useCallback } from 'react'
import { Form, Input, Button } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { loginRequestAction } from '../reducers/user'

const LoginForm = () => {
    const dispatch = useDispatch()
    const { loginDone } = useSelector((state) => state.user)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value)
    }, [])

    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value)
    }, [])

    const onSubmitForm = useCallback(() => {
        console.log('onSubmitForm :: ', email, password)
        dispatch(loginRequestAction({ email, password }))
    }, [email, password])

    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">이메일</label>
                <br />
                <Input
                    name="user-email"
                    type="email"
                    value={email}
                    onChange={onChangeEmail}
                    required
                />
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input
                    name="user-password"
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    required
                />
            </div>
            <ButtonWrapper>
                <Button type="primary" htmlType="submit" loading={loginDone}>로그인</Button>
                <Link href="/signup">
                    <a>
                        <Button>회원가입</Button>
                    </a>
                </Link>
            </ButtonWrapper>
        </FormWrapper>
    )
}

const ButtonWrapper = styled.div`
  margin-top: 10px;
`

const FormWrapper = styled(Form)`
  padding-left: 10px;
`

export default LoginForm
