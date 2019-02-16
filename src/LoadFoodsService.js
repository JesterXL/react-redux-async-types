import { loadFoods, loadFoodsFailure, loadFoodsSuccess } from './foodsReducer'

export const fetchFoods = () =>
    fetch('/food/list')
    .then(response => {
        console.log("response:", response.body)
        if(response.ok && response.status === 200) {
            return response.json()
        }
        return Promise.reject(new Error(response.statusText))
    })
    .catch(error => console.log("loadFoods, error:", error))

export const loadFoodsThunk = () => dispatch => {
    dispatch(loadFoods())
    fetchFoods()
    .then(foods =>
        dispatch(loadFoodsSuccess(foods))
    )
    .catch(error =>
        dispatch(loadFoodsFailure(error))    
    )
}