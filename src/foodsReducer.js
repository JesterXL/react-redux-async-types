const { union, derivations } = require('folktale/adt/union')

const LOAD_FOODS = 'LOAD_FOODS'
const LOAD_FOODS_FAILURE = 'LOAD_FOODS_FAILURE'
const LOAD_FOODS_SUCCESS = 'LOAD_FOODS_SUCCESS'

export const loadFoods = () =>
    ({ type: LOAD_FOODS })

export const loadFoodsSuccess = foods =>
    ({ type: LOAD_FOODS_SUCCESS, foods })

export const loadFoodsFailure = error =>
    ({ type: LOAD_FOODS_FAILURE, error })

export const FoodsState = union('FoodsState', {
    LoadingFoods() { return {} }
    , FoodsLoaded(foods) { return { foods } }
    , FoodsError(error) { return { error } }
})
.derive(derivations.debugRepresentation)
export const { LoadingFoods, FoodsLoaded, FoodsError } = FoodsState

export const foods = (state=LoadingFoods(), action) => {
    switch(action.type) {
        case LOAD_FOODS:
            return LoadingFoods()
        case LOAD_FOODS_FAILURE:
            return FoodsError(action.error)
        case LOAD_FOODS_SUCCESS:
            return FoodsLoaded(action.foods)
        default:
            return state
    }
}
