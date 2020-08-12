import { all, takeLatest, put, fork, delay } from 'redux-saga/effects'
import * as axios from 'axios'
import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
} from '../reducers/post'

function addPostApi(data) {
    return axios.post('/api/post', data)
}

function addCommentApi(data) {
    return axios.post('/api/post', data)
}

function* addPost() {
    try {
        // const result = yield call(addPostApi)
        delay(1000)
        yield put({
            type: ADD_POST_SUCCESS,
            // data: result.data
        })
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function* addComment() {
    try {
        // const result = yield call(addPostApi)
        delay(1000)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            // data: result.data
        })
    } catch (err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data,
        })
    }
}

function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* rootSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
    ])
}
