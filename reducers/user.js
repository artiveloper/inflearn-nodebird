import produce from 'immer'
import {
    ADD_POST_TO_ME,
    REMOVE_POST_TO_ME,
} from './post'

export const initialState = {
    logInLoading: false, // 로그인
    logInDone: false,
    logInError: null,

    logOutLoading: false, // 로그아웃
    logOutDone: false,
    logOutError: null,

    signUpLoading: false, // 회원가입
    signUpDone: false,
    signUpError: null,

    changeNicknameLoading: false, // 닉네임 변경
    changeNicknameDone: false,
    changeNicknameError: null,

    followLoading: false, // 팔로우
    followDone: false,
    followError: null,

    unFollowLoading: false, // 언팔로우
    unFollowDone: false,
    unFollowError: null,

    me: null,
    signUpData: {},
    loginData: {},
}

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE'

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE'

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST'
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS'
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE'

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE'

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST'
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS'
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE'

const dummyUser = (data) => ({
    ...data,
    nickname: 'artiveloper',
    id: 1,
    Posts: [{ id: 1 }],
    Followings: [{ nickname: '닉네임1' }, { nickname: '닉네임2' }, { nickname: '닉네임3' }],
    Followers: [{ nickname: '닉네임1' }, { nickname: '닉네임2' }, { nickname: '닉네임3' }],
})

export const loginRequestAction = (data) => ({
    type: LOG_IN_REQUEST,
    data,
})

export const logoutRequestAction = () => ({
    type: LOG_OUT_REQUEST,
})

const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch (action.type) {
    // 로그인
    case LOG_IN_REQUEST:
        draft.logInLoading = true
        draft.logInDone = false
        draft.logInError = null
        break

    case LOG_IN_SUCCESS:
        draft.logInLoading = false
        draft.logInDone = true
        draft.me = dummyUser(action.data)
        break

    case LOG_IN_FAILURE:
        draft.logInLoading = false
        draft.logInError = action.error
        break

        // 로그아웃
    case LOG_OUT_REQUEST:
        draft.logOutLoading = true
        draft.logOutDone = false
        draft.logOutError = null
        break

    case LOG_OUT_SUCCESS:
        draft.logOutLoading = false
        draft.logOutDone = true
        draft.me = null
        break

    case LOG_OUT_FAILURE:
        draft.logOutLoading = false
        draft.logOutError = action.error
        break

        // 회원가입
    case SIGN_UP_REQUEST:
        draft.signUpLoading = true
        draft.signUpDone = false
        draft.signUpError = null
        break

    case SIGN_UP_SUCCESS:
        draft.signUpLoading = false
        draft.signUpDone = true
        draft.me = null
        break

    case SIGN_UP_FAILURE:
        draft.signUpLoading = false
        draft.signUpError = action.error
        break

        // 닉네임 변경
    case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true
        draft.changeNicknameDone = false
        draft.changeNicknameError = null
        break

    case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false
        draft.changeNicknameDone = true
        draft.me = null
        break

    case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false
        draft.changeNicknameError = action.error
        break

        // 팔로우
    case FOLLOW_REQUEST:
        draft.followLoading = true
        draft.followDone = false
        draft.followError = null
        break

    case FOLLOW_SUCCESS:
        draft.me.Followings.push({ id: action.data })
        draft.followLoading = false
        draft.followDone = true
        break

    case FOLLOW_FAILURE:
        draft.followLoading = false
        draft.followError = action.error
        break

        // 언팔로우
    case UNFOLLOW_REQUEST:
        draft.unFollowLoading = true
        draft.unFollowDone = false
        draft.unFollowError = null
        break

    case UNFOLLOW_SUCCESS:
        draft.me.Followings = draft.me.Followings.filter((x) => x.id !== action.data)
        draft.unFollowLoading = false
        draft.unFollowDone = true
        break

    case UNFOLLOW_FAILURE:
        draft.unFollowLoading = false
        draft.unFollowError = action.error
        break

    case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data })
        break

    case REMOVE_POST_TO_ME:
        draft.me.Posts = draft.me.Posts.filter((p) => p.id !== action.data)
        break

    default:
        break
    }
})

export default reducer
