import { find, reject, reduce } from 'lodash/fp'

export const ADD_FOOD = 'ADD_FOOD'
export const REMOVE_FOOD = 'REMOVE_FOOD'

export const addFood = food =>
    ({ type: ADD_FOOD, food })

export const removeFood = food =>
    ({ type: REMOVE_FOOD, food })

const findFood = foodID =>
    find(
        food => food.id === foodID
    )

export const containsFood = foods => foodID =>
    findFood(foodID)(foods)
    ? true
    : false

const addFoodIDNoDuplicates = foods => food =>
    containsFood(foods)(food.id)
    ? foods
    : [...foods, food]

const removeFoodIDFromFood = foods => foodToRemove =>
    reject(
        food => food.id === foodToRemove.id
        , foods
    )

const updateMacros =
    reduce(
        (acc, food) => {
            return {
                totalCalories: acc.totalCalories + food.calories
                , fat: acc.fat + food.fat
                , carbs: acc.carbs + food.carbs
                , protein: acc.protein + food.protein
                }
        }
        , ({ totalCalories: 0, fat: 0, carbs: 0, protein: 0 })
    )

const defaultState = {
    totalCalories: 0
    , fat: 0
    , carbs: 0
    , protein: 0
    , foods: []
}

export const calories = (state=defaultState, action) => {
    switch(action.type) {
        case ADD_FOOD:
            const foodsAdded = addFoodIDNoDuplicates(state.foods)(action.food)
            const macrosAdded = updateMacros(foodsAdded)
            const result = { foods: foodsAdded, ...macrosAdded }
            return result
        case REMOVE_FOOD:
            const foodsRemoved = removeFoodIDFromFood(state.foods)(action.food)
            const macrosRemoved = updateMacros(foodsRemoved)
            return { foods: foodsRemoved, ...macrosRemoved}
        default:
            return state
    }
}