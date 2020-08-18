import shortId from 'shortid'
import faker from 'faker'
import produce from 'immer'

export const initialState = {
    mainPosts: [
        {
            id: shortId.generate(),
            User: {
                id: shortId.generate(),
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

initialState.mainPosts = initialState.mainPosts.concat(
    Array(20).fill().map(() => ({
        id: shortId.generate(),
        User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
        },
        content: faker.lorem.paragraph(),
        Images: [{
            src: faker.image.image(),
        }],
        Comment: [{
            User: {
                id: shortId.generate(),
                nickname: faker.name.findName(),
            },
            content: faker.lorem.sentence(),
        }],
    })),
)

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

const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
    // 게시글 등록
    case ADD_POST_REQUEST: {
        draft.addPostLoading = true
        draft.addPostDone = true
        draft.addPostError = null
        break
    }
    case ADD_POST_SUCCESS: {
        draft.mainPosts.unshift(dummyPost(action.data))
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
        const post = draft.mainPosts.find((p) => p.id === action.data.postId)
        post.Comments.unshift(dummyComment(action.data.content))
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
