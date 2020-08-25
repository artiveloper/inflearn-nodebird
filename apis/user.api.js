import { instance } from './index'

const signUpApi = (data) => instance.post('/user', data)
const loginApi = (data) => instance.post('/user/login', data)
const logoutApi = () => instance.post('/user/logout')

export {
    signUpApi,
    loginApi,
    logoutApi,
}
