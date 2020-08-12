import React, { useCallback, useState } from 'react'
import Head from 'next/head'
import Button, { Form, Input } from 'antd'
import Checkbox from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import useInput from '../hooks/useInput'
import AppLayout from '../components/AppLayout'

import { SIGN_UP_REQUEST } from '../reducers/user'

const [passwordCheck, setPasswordCheck] = useState('')
const [term, setTerm] = useState(false)
const [passwordError, setPasswordError] = useState(false)
const [termError, setTermError] = useState(false)

const [email, onChangeEmail] = useInput('')
const [nickname, onChnageNickname] = useInput('')
const [password, onChangePassword] = useInput('')

const dispatch = useDispatch()
const { isSigningUp } = useSelector((state) => state.user)

const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
        return setPasswordError(true)
    }

    if (!term) {
        return setTermError(true)
    }

    console.log('signup info :', email, nickname, password)
    return dispatch({
        type: SIGN_UP_REQUEST,
        data: {
            email,
            password,
            nickname,
        },
    })
}, [email, password, passwordCheck, term])

const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password)
    setPasswordCheck(e.target.value)
}, [password])

const onChangeTerm = useCallback((e) => {
    setTermError(false)
    setTerm(e.target.checked)
}, [])

const SignUp = () => (
    <>
        <Head>
            <title>NodeBird | 회원가입</title>
        </Head>
        <AppLayout>
            <Head>
                <title>회원가입 | NodeBird</title>
            </Head>
            <Form onFinish={onSubmit} style={{ padding: 10 }}>
                <div>
                    <label htmlFor="user-email">아이디</label>
                    <br />
                    <Input name="user-email" value={email} required onChange={onChangeEmail} />
                </div>
                <div>
                    <label htmlFor="user-nick">닉네임</label>
                    <br />
                    <Input name="user-nick" value={nickname} required onChange={onChnageNickname} />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br />
                    <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호체크</label>
                    <br />
                    <Input
                        name="user-password-check"
                        type="password"
                        value={passwordCheck}
                        required
                        onChange={onChangePasswordCheck}
                    />
                    {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>제로초 말을 잘 들을 것을 동의합니다.</Checkbox>
                    {termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
                </div>
                <div style={{ marginTop: 10 }}>
                    <Button type="primary" htmlType="submit" loading={isSigningUp}>가입하기</Button>
                </div>
            </Form>
        </AppLayout>
    </>
)

export default SignUp
