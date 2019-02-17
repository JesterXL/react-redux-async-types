import React, { useReducer } from 'react'
import { foods } from './foodsReducer'
import { calories } from './caloriesReducer'


const initialState = {
    foods: foods(undefined, { type: '@init' })
    , calories: calories(undefined, { type: '@init' })
}
const combinedReducers = (state, action) =>
    ({
        foods: foods(state, action)
        , calories: calories(state, action)
    })

const Store = React.createContext()

const createStore = (reducer, initialState) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return { state, dispatch }
}

const Provider = ({ children }) => {
    const store = createStore(combinedReducers, initialState)
    return <Store.Provider value={store}>{children}</Store.Provider>
}

export { Store, Provider }