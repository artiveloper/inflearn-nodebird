import {all, takeLatest, put, call} from 'redux-saga/effects';

import * as axios from 'axios';

function addPostApi(data) {
    return axios.post('/api/post', data)
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

function* watchAddPost() {
    yield takeLatest('ADD_POST_REQUEST', addPost)
}

export default function* rootSaga() {
    yield all([
        watchAddPost
    ])
}
