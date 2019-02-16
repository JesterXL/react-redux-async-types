import { combineReducers } from 'redux'
import { foods } from './foodsReducer'
import { calories } from './caloriesReducer'

export default combineReducers({ foods, calories })