import {all, takeLatest, call, put, delay} from 'redux-saga/effects'
import * as axios from 'axios';

function loginApi() {
    return axios.post('/api/login')
}

function logoutApi() {
    return axios.post('/api/logout')
}

function addPostApi(data) {
    return axios.post('/api/post', data)
}

function* login() {
    try {
        //const result = yield call(loginApi, action.data)
        yield delay(1000)
        yield put({
            type: 'LOG_IN_SUCCESS',
            //data: result.data
        })
    } catch (err) {
        yield put({
            type: 'LOG_IN_FAILURE',
            data: err.response.data
        })
    }
}

function* logout() {
    try {
        const result = yield call(logoutApi)
        yield put({
            type: 'LOG_OUT_SUCCESS',
            data: result.data
        })
    } catch (err) {
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: err.response.data
        })
    }
}

function* addPost() {
    try {
        const result = yield call(addPostApi)
        yield put({
            type: 'ADD_POST_SUCCESS',
            data: result.data
        })
    } catch (err) {
        yield put({
            type: 'ADD_POST_FAILURE',
            data: err.response.data
        })
    }
}

function* watchLogin() {
    yield takeLatest('LOG_IN_REQUEST', login)
}

function* watchLogut() {
    yield takeLatest('LOG_OUT_REQUEST', logout)
}

function* watchAddPost() {
    yield takeLatest('ADD_POST_REQUEST', addPost)
}

export default function* rootSaga() {
    yield all([
        watchLogin,
        watchLogut,
        watchAddPost
    ])
}
