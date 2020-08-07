export const initialState = {
    mainPosts: [
        {
            id: 1,
            User: {
                id: 1,
                nickname: 'artiveloper'
            },
            content: '첫 번째 게시글 #해시태그 #익스프레스',
            Images: [
                {
                    src: 'https://cloudinary-res.cloudinary.com/image/upload/c_scale,f_auto,q_auto,w_550/v1589377391/website/home-redesign/cloudinary_web_homepage_product_highlights_api.png'
                },
                {
                    src: 'https://cloudinary-res.cloudinary.com/image/upload/c_scale,f_auto,q_auto,w_550/v1589377391/website/home-redesign/cloudinary_web_homepage_product_highlights_api.png'
                }
            ],
            Comments: [
                {
                    User: {
                        nickname: 'zerocho'
                    },
                    content: '이미지가 고퀄이네요.'
                },
                {
                    User: {
                        nickname: 'inflearn'
                    },
                    content: '잘만들고있네요.'
                }
            ]
        }
    ],
    imagePaths: [],
    postAdded: false,
}

const ADD_POST = 'ADD_POST'

export const addPost = {
    type: ADD_POST
}

const dummyPost = {
    id: 2,
    User: {
        id: 1,
        nickname: 'artiveloper'
    },
    content: '더미데이터입니다.',
    Images: [],
    Comments: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts]
            }
        default:
            return state;
    }
}

export default reducer
