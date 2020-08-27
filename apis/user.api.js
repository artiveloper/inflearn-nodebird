import { instance } from './index'

const loadUserApi = () => instance.get('/user')
const signUpApi = (data) => instance.post('/user', data)
const loginApi = (data) => instance.post('/user/login', data)
const logoutApi = () => instance.post('/user/logout')

export {
    loadUserApi,
    signUpApi,
    loginApi,
    logoutApi,
}
