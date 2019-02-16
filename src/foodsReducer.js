export const LOAD_FOODS = 'LOAD_FOODS'
export const LOAD_FOODS_SUCCESS = 'LOAD_FOODS_SUCCESS'
export const LOAD_FOODS_FAILURE = 'LOAD_FOODS_FAILURE'

export const loadFoods = () =>
    ({ type: LOAD_FOODS })

export const loadFoodsSuccess = foods =>
    ({ type: LOAD_FOODS_SUCCESS, foods })

export const loadFoodsFailure = error =>
    ({ type: LOAD_FOODS_FAILURE, error })

const defaultState = {
    isLoading: true
    , error: undefined
    , isError: false
    , foods: undefined
}
export const foods = (state=defaultState, action) => {
    switch(action.type) {
        case LOAD_FOODS:
            return {
                ...state
                , isLoading: true
                , isError: false
                , error: undefined
                , foods: undefined
            }
        case LOAD_FOODS_FAILURE:
            return {
                ...state
                , isLoading: false
                , isError: true
                , error: action.error
                , foods: undefined
            }
        case LOAD_FOODS_SUCCESS:
            return {
                ...state
                , isLoading: false
                , isError: false
                , error: undefined
                , foods: action.foods
            }
        default:
            return state
    }
}