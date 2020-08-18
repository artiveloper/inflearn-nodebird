import { all, takeLatest, put, fork, delay } from 'redux-saga/effects'
import * as axios from 'axios'
import shortId from 'shortid'
import {
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_TO_ME,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_FAILURE,
    REMOVE_POST_TO_ME,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
} from '../reducers/post'

function addPostApi(data) {
    return axios.post('/api/post', data)
}

function removePostApi(data) {
    return axios.post('/api/post', data)
}

function addCommentApi(data) {
    return axios.post('/api/post', data)
}

function* addPost(action) {
    try {
        // const result = yield call(addPostApi)
        yield delay(1000)
        const id = shortId.generate()
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                id,
                content: action.data,
            },
        })
        yield put({
            type: ADD_POST_TO_ME,
            data: id,
        })
    } catch (err) {
        console.log(err.response.data)
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function* removePost(action) {
    try {
        // const result = yield call(addPostApi)
        yield delay(1000)
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data,
        })
        yield put({
            type: REMOVE_POST_TO_ME,
            data: action.data,
        })
    } catch (err) {
        console.log(err.response.data)
        yield put({
            type: REMOVE_POST_FAILURE,
            error: err.response.data,
        })
    }
}

function* addComment(action) {
    try {
        // const result = yield call(addPostApi)
        yield delay(1000)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data,
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

function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost)
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* rootSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
    ])
}
