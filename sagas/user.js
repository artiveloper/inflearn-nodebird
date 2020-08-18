import { all, delay, put, fork, takeLatest } from 'redux-saga/effects'
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
    FOLLOW_REQUEST,
    FOLLOW_SUCCESS,
    FOLLOW_FAILURE,
    UNFOLLOW_REQUEST,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAILURE,
} from '../reducers/user'

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
        fork(watchLogout),
        fork(watchFollow),
        fork(watchUnFollow),
    ])
}
