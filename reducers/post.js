import shortId from 'shortid'

export const initialState = {
    mainPosts: [
        {
            id: 1,
            User: {
                id: 1,
                nickname: 'artiveloper',
            },
            content: '첫 번째 게시글 #해시태그 #익스프레스',
            Images: [
                {
                    id: shortId.generate(),
                    src: 'https://cloudinary-res.cloudinary.com/image/upload/c_scale,f_auto,q_auto,w_550/v1589377391/website/home-redesign/cloudinary_web_homepage_product_highlights_api.png',
                },
                {
                    id: shortId.generate(),
                    src: 'https://cloudinary-res.cloudinary.com/image/upload/c_scale,f_auto,q_auto,w_550/v1589377391/website/home-redesign/cloudinary_web_homepage_product_highlights_api.png',
                },
            ],
            Comments: [
                {
                    id: shortId.generate(),
                    User: {
                        id: shortId.generate(),
                        nickname: 'zerocho',
                    },
                    content: '이미지가 고퀄이네요.',
                },
                {
                    id: shortId.generate(),
                    User: {
                        id: shortId.generate(),
                        nickname: 'inflearn',
                    },
                    content: '잘만들고있네요.',
                },
            ],
        },
    ],
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

const dummyPost = (data) => ({
    id: data.id,
    User: {
        id: 1,
        nickname: 'artiveloper',
    },
    content: data.content,
    Images: [],
    Comments: [],
})

const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: 'artiveloper@@',
    },
})

const reducer = (state = initialState, action) => {
    switch (action.type) {
    // 게시글 등록
    case ADD_POST_REQUEST: {
        return {
            ...state,
            addPostLoading: true,
            addPostDone: false,
            addPostError: null,
        }
    }
    case ADD_POST_SUCCESS: {
        return {
            ...state,
            mainPosts: [dummyPost(action.data), ...state.mainPosts],
            addPostLoading: false,
            addPostDone: true,
        }
    }
    case ADD_POST_FAILURE: {
        return {
            ...state,
            addPostLoading: false,
            addPostError: action.error,
        }
    }

    // 게시글 삭제
    case REMOVE_POST_REQUEST: {
        return {
            ...state,
            removePostLoading: true,
            removePostDone: false,
            removePostError: null,
        }
    }
    case REMOVE_POST_SUCCESS: {
        return {
            ...state,
            mainPosts: state.mainPosts.filter((p) => p.id !== action.data),
            removePostLoading: false,
            removePostDone: true,
        }
    }
    case REMOVE_POST_FAILURE: {
        return {
            ...state,
            removePostLoading: false,
            removePostError: action.error,
        }
    }

    // 댓글 등록
    case ADD_COMMENT_REQUEST: {
        return {
            ...state,
            addCommentLoading: true,
            addCommentDone: false,
            addCommentError: null,
        }
    }
    case ADD_COMMENT_SUCCESS: {
        const postIndex = state.mainPosts.findIndex((p) => p.id === action.data.postId)
        const post = { ...state.mainPosts[postIndex] }
        post.Comments = [dummyComment(action.data.content), ...post.Comments]
        const mainPosts = [...state.mainPosts]
        mainPosts[postIndex] = post

        return {
            ...state,
            mainPosts,
            addCommentLoading: false,
            addCommentDone: true,
        }
    }
    case ADD_COMMENT_FAILURE: {
        return {
            ...state,
            addCommentLoading: false,
            addCommentError: action.error,
        }
    }

    default:
        return state
    }
}

export default reducer
