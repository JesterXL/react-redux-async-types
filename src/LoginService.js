import { loggedOut, loginStart, loginSuccess, loginFailure } from './loginReducer'
import fetch from 'cross-fetch'
import { navigate } from '@reach/router'

export const fetchLogin = username => password =>
    fetch('/login', 
    {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json'},
        body: JSON.stringify({username, password})
    })
    .then(response => {
        console.log("response.ok:", response.ok)
        console.log("response.status:", response.status)
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

// export const logout = dispatch => () => {
//     dispatch(loggedOut())
// }