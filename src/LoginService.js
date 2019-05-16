import { loggedOut, loginStart, loginSuccess, loginFailure } from './loginReducer'
import fetch from 'cross-fetch'
import { navigate } from '@reach/router'

export const fetchLogin = username => password =>
    fetch('/food/login', 
    {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify({username, password})
    })
    .then(response => {
        if(response.ok && response.status === 200) {
            return response.json()
        }
        return Promise.reject(new Error(response.statusText))
    })

export const loginThunk = dispatch => username => password => {
    console.log("loginThunk, username:", username, "password:", password)
    dispatch(loginStart())
    fetchLogin(username)(password)
    .then(() => {
        dispatch(loginSuccess())
        navigate('/foods')
    })
    .catch(error =>
        dispatch(loginFailure(error))    
    )
}

export const logout = dispatch => () => {
    dispatch(loggedOut())
}