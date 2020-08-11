import {all, call, delay, put, takeLatest} from 'redux-saga/effects';
import * as axios from 'axios';

function loginApi() {
    return axios.post('/api/login')
}

function logoutApi() {
    return axios.post('/api/logout')
}

function* login(action) {
    try {
        console.log('hihihihihi')
        //const result = yield call(loginApi, action.data)
        yield delay(1000)
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: action.data
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

function* watchLogin() {
    yield takeLatest('LOG_IN_REQUEST', login)
}

function* watchLogut() {
    yield takeLatest('LOG_OUT_REQUEST', logout)
}

export default function* userSaga() {
    yield all([
        watchLogin,
        watchLogut,
    ])
}
