export const ADD_FOOD = 'ADD_FOOD'
export const REMOVE_FOOD = 'REMOVE_FOOD'

export const addFood = food =>
    ({ type: ADD_FOOD, food })

export const removeFood = food =>
    ({ type: REMOVE_FOOD, food })

const defaultState = {
    calories: 0
    , fat: 0
    , carbs: 0
    , protein: 0
}
export const calories = (state=defaultState, action) => {
    switch(action.type) {
        case ADD_FOOD:
            return {
                calories: state.calories + action.food.calories
                , fat: state.fat + action.food.fat
                , carbs: state.carbs + action.food.carbs
                , protein: state.protein + action.food.protein
            }
        case REMOVE_FOOD:
            return {
                calories: state.calories - action.food.calories
                , fat: state.fat - action.food.fat
                , carbs: state.carbs - action.food.carbs
                , protein: state.protein - action.food.protein
            }
        default:
            return state
    }
}