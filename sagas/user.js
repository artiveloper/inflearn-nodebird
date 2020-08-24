import { all, delay, call, put, fork, takeLatest } from 'redux-saga/effects'
import axios from 'axios'
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    FOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    FOLLOW_FAILURE,
    UNFOLLOW_REQUEST,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAILURE,
} from '../reducers/user'

function signUpApi(data) {
    return axios.post('http://localhost:3000/user', data)
}

function* login(action) {
    try {
        // const result = yield call(logInAPI);
        yield delay(1000)
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data,
        })
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        })
    }
}

function* signUp(action) {
    try {
        yield call(signUpApi, action.data)
        yield put({
            type: SIGN_UP_SUCCESS,
            data: action.data,
        })
    } catch (err) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        })
    }
}

function* logout() {
    try {
        // const result = yield call(logoutApi)
        yield delay(1000)
        yield put({
            type: LOG_OUT_SUCCESS,
            // data: result.data
        })
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        })
    }
}

function* follow(action) {
    try {
        // const result = yield call(logInAPI);
        yield delay(1000)
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data,
        })
    } catch (err) {
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data,
        })
    }
}

function* unFollow(action) {
    try {
        // const result = yield call(logInAPI);
        yield delay(1000)
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data,
        })
    } catch (err) {
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data,
        })
    }
}

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login)
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp)
}

function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logout)
}

function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow)
}

function* watchUnFollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unFollow)
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchSignUp),
        fork(watchLogout),
        fork(watchFollow),
        fork(watchUnFollow),
    ])
}
