import { combineReducers } from 'redux'
import { login } from './loginReducer'
import { foods } from './foodsReducer'
import { calories } from './caloriesReducer'

export default combineReducers({ login, foods, calories })