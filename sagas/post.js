import {all, call, takeLatest, put, fork, delay} from 'redux-saga/effects'
import * as axios from 'axios'
import {
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    LOAD_POSTS_FAILURE,
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
import {
    addPostApi,
    addCommentApi,
    loadPostsApi,
} from '../apis/post.api'

function* loadPosts() {
    try {
        const result = yield loadPostsApi()
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.log(err.response.data)
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: err.response.data,
        })
    }
}

function* addPost(action) {
    try {
        const result = yield call(addPostApi, action.data)
        yield put({
            type: ADD_POST_SUCCESS,
            data: result.data,
        })
        yield put({
            type: ADD_POST_TO_ME,
            data: result.data.id,
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
        const result = yield call(addCommentApi, action.data)
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data,
        })
    } catch (err) {
        console.log(err.response.data)
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data,
        })
    }
}

function* watchLoadPosts() {
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts)
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
        fork(watchLoadPosts),
        fork(watchAddPost),
        fork(watchRemovePost),
        fork(watchAddComment),
    ])
}
