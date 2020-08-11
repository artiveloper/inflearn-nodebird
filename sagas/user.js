import {all, delay, put, fork, takeLatest} from 'redux-saga/effects';
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    LOG_OUT_FAILURE,
} from '../reducers/user'

function* login(action) {
    try {
        // const result = yield call(logInAPI);
        yield delay(1000)
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        });
    }
}

function* logout() {
    try {
        //const result = yield call(logoutApi)
        console.log('before logout delay')
        yield delay(1000)
        yield put({
            type: LOG_OUT_SUCCESS,
            //data: result.data
        })
        console.log('after logout delay')
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            data: err.response.data
        })
    }
}

function* watchLogin() {
    yield takeLatest(LOG_IN_REQUEST, login)
}

function* watchLogout() {
    yield takeLatest(LOG_OUT_REQUEST, logout)
}

export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
    ])
}
