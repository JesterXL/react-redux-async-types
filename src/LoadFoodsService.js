import { loadFoods, loadFoodsFailure, loadFoodsSuccess } from './foodsReducer'
import fetch from 'cross-fetch'
import { navigate } from '@reach/router'

export const fetchFoods = () =>
    fetch('/food/list')
    .then(response => {
        if(response.status === 401) {
            return 'unauthorized'
        }
        if(response.ok && response.status === 200) {
            return response.json()
        }
        return Promise.reject(new Error(response.statusText))
    })

export const fetchFoodsFail = () =>
    new Promise((success, failure) => {
        setTimeout(() => {
            failure(new Error('intentional b00m'))
        }, 2000)
    })

export const loadFoodsThunk = dispatch => () => {
    dispatch(loadFoods())
    fetchFoods()
    .then(foods => {
        if(foods === 'unauthorized') {
            dispatch(loadFoodsFailure(new Error('Unauthorized')))
            navigate('/login')
            return
        }
        dispatch(loadFoodsSuccess(foods))
    })
    .catch(error =>
        dispatch(loadFoodsFailure(error))    
    )
}

export const loadFoodsFailThunk = dispatch => () => {
    dispatch(loadFoods())
    fetchFoodsFail()
    .then(foods =>
        dispatch(loadFoodsSuccess(foods))
    )
    .catch(error =>
        dispatch(loadFoodsFailure(error))    
    )
}