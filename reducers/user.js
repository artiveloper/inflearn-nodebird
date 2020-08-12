export const initialState = {
    logInLoading: false, // 로그인 시도중
    logInDone: false,
    logInError: null,

    logOutLoading: false, // 로그아웃 시도중
    logOutDone: false,
    logOutError: null,

    signUpLoading: false, // 회원가입 시도중
    signUpDone: false,
    signUpError: null,

    me: null,
    signUpData: {},
    loginData: {}
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

const dummyUser = (data) => {
    return {
        ...data,
        nickname: 'artiveloper',
        id: 1,
        Posts: [],
        Followings: [],
        Followers: []
    }
}

export const loginRequestAction = (data) => {
    return {
        type: LOG_IN_REQUEST,
        data: data
    }
}

export const logoutRequestAction = () => {
    return {
        type: LOG_OUT_REQUEST,
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // 로그인
        case LOG_IN_REQUEST: {
            return {
                ...state,
                logInLoading: true,
                logInDone: false,
                logInError: null,
            }
        }
        case LOG_IN_SUCCESS: {
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                me: dummyUser(action.data)
            }
        }
        case LOG_IN_FAILURE: {
            return {
                ...state,
                logInLoading: false,
                logInError: action.error,
            }
        }

        // 로그아웃
        case LOG_OUT_REQUEST: {
            return {
                ...state,
                logOutLoading: true,
                logOutDone: false,
                logOutError: null
            }
        }
        case LOG_OUT_SUCCESS: {
            return {
                ...state,
                logOutLoading: false,
                logOutDone: true,
                me: null
            }
        }
        case LOG_OUT_FAILURE: {
            return {
                ...state,
                logOutLoading: false,
                logOutError: action.error,
            }
        }
        default:
            return state;
    }
}

export default reducer
