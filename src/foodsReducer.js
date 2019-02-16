const { union, derivations } = require('folktale/adt/union')

const FoodsState = union('FoodsState', {
    FoodsLoading() { return {} }
    , FoodsLoaded(foods) { return { foods } }
    , FoodsError(error) { return { error } }
})
.derive(derivations.debugRepresentation)
const { FoodsLoading, FoodsLoaded, FoodsError } = FoodsState

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