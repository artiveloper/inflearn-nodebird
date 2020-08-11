export const initialState = {
    isLoggingIn: false, // 로그인 시도중
    isLoggingOut: false, // 로그인 시도중
    isLoggedIn: false,
    me: null,
    signUpData: {},
    loginData: {}
}

export const loginRequestAction = (data) => {
    console.log('loginRequestAction')
    return {
        type: 'LOG_IN_REQUEST',
        data: data
    }
}

export const logoutRequestAction = () => {
    return {
        type: 'LOG_OUT_REQUEST',
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN_REQUEST': {
            console.log('LOG_IN_REQUEST in reducer')
            return {
                ...state,
                isLoggingIn: true,
            }
        }
        case 'LOG_IN_SUCCESS': {
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                me: {
                    ...action.data,
                    nickname: 'artiveloper'
                }
            }
        }
        case 'LOG_IN_FAILURE': {
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: false,
                me: action.data
            }
        }

        case 'LOG_OUT_REQUEST': {
            return {
                ...state,
                isLoggingOut: true,
                isLoggedIn: false,
                me: null
            }
        }
        case 'LOG_OUT_SUCCESS': {
            return {
                ...state,
                isLoggingOut : false,
                isLoggedIn: false,
                me: null
            }
        }
        case 'LOG_OUT_FAILURE': {
            return {
                ...state,
                isLoggingOut: false,
                isLoggedIn: false,
                me: null
            }
        }
        default:
            return state;
    }
}

export default reducer
