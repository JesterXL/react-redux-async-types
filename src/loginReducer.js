const { union, derivations } = require('folktale/adt/union')

const LOGGED_OUT = 'LOGGED_OUT'
const LOGIN = 'LOGIN'
const LOGIN_FAILURE = 'LOGIN_FAILURE'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

export const loggedOut = () =>
    ({ type: LOGGED_OUT })

export const loginStart = () =>
    ({ type: LOGIN })

export const loginSuccess = () =>
    ({ type: LOGIN_SUCCESS })

export const loginFailure = error =>
    ({ type: LOGIN_FAILURE, error })

export const LoginState = union('LoginState', {
    LoggedOut() { return {} },
    LoggingIn() { return {} },
    LoginSuccess() { return {} },
    LoginError(error) { return { error } }
})
.derive(derivations.debugRepresentation)
export const { LoggedOut, LoggingIn, LoginSuccess, LoginError } = LoginState

export const login = (state=LoggedOut(), action) => {
    switch(action.type) {
        case LOGGED_OUT:
            return LoggedOut()
        case LOGIN:
            return LoggingIn()
        case LOGIN_FAILURE:
            return LoginError(action.error)
        case LOGIN_SUCCESS:
            return LoginSuccess()
        default:
            return state
    }
}
