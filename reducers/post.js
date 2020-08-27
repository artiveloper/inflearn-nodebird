import shortId from 'shortid'
import produce from 'immer'

export const initialState = {
    mainPosts: [],
    hasMorePosts: true,

    // 게시글 조회
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,

    // 게시글 등록
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,

    // 게시글 삭제
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,

    // 댓글 등록
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,

    imagePaths: [],
    postAdded: false,
}

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST'
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE'

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME'
export const REMOVE_POST_TO_ME = 'REMOVE_POST_TO_ME'

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
})

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
})

const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
    // 게시글 조회
    case LOAD_POSTS_REQUEST: {
        draft.loadPostsLoading = true
        draft.loadPostsDone = true
        draft.loadPostsError = null
        break
    }
    case LOAD_POSTS_SUCCESS: {
        draft.mainPosts = action.data.concat(draft.mainPosts)
        draft.loadPostsLoading = false
        draft.loadPostsDone = true
        draft.hasMorePosts = draft.mainPosts.length < 50
        break
    }
    case LOAD_POSTS_FAILURE: {
        draft.loadPostsLoading = false
        draft.loadPostsError = action.error
        break
    }

    // 게시글 등록
    case ADD_POST_REQUEST: {
        draft.addPostLoading = true
        draft.addPostDone = true
        draft.addPostError = null
        break
    }
    case ADD_POST_SUCCESS: {
        draft.mainPosts.unshift(action.data)
        draft.addPostLoading = false
        draft.addPostDone = true
        break
    }
    case ADD_POST_FAILURE: {
        draft.addPostLoading = false
        draft.addPostError = action.error
        break
    }

    // 게시글 삭제
    case REMOVE_POST_REQUEST: {
        draft.removePostLoading = true
        draft.removePostDone = false
        draft.removePostError = null
        break
    }
    case REMOVE_POST_SUCCESS: {
        draft.mainPosts = draft.mainPosts.filter((p) => p.id !== action.data)
        draft.removePostLoading = false
        draft.removePostDone = true
        break
    }
    case REMOVE_POST_FAILURE: {
        draft.removePostLoading = false
        draft.removePostError = action.error
        break
    }

    // 댓글 등록
    case ADD_COMMENT_REQUEST: {
        draft.addCommentLoading = true
        draft.addCommentDone = false
        draft.addCommentError = null
        break
    }
    case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((p) => p.id === action.data.PostId)
        post.Comments.unshift(action.data)
        draft.addCommentLoading = false
        draft.addCommentDone = true
        break
    }
    case ADD_COMMENT_FAILURE: {
        draft.addCommentLoading = false
        draft.addCommentError = action.error
        break
    }

    default:
        break
    }
})

export default reducer
