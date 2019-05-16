import React, { useEffect } from 'react';
import Loading from './Loading'
import Failed from './Failed'
import FoodsList from './FoodList'
import { connect } from 'react-redux'
import { loadFoodsThunk } from './LoadFoodsService'
import { addFood, removeFood } from './caloriesReducer'

const mapStateToProps = state =>
    ({ foods: state.foods, calories: state.calories })

const mapDispatchToProps = dispatch =>
    ({
        loadFoodsThunk: loadFoodsThunk(dispatch)
        , addFood: food => dispatch(addFood(food))
        , removeFood: food => dispatch(removeFood(food))
    })

const FoodsView = props => {
    useEffect(() => {
        props.loadFoodsThunk()
    }, [])
    
    return props.foods.matchWith({
        LoadingFoods: () =>
            (<Loading />)
        , FoodsError: ({ error }) =>
            (<Failed error={error} />)
        , FoodsLoaded: ({ foods }) =>
            (<FoodsList foods={foods} calories={props.calories} addFood={props.addFood} removeFood={props.removeFood} />)
    })
}

export default connect(
    mapStateToProps
    , mapDispatchToProps
)(FoodsView)