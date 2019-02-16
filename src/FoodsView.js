import React, { useEffect } from 'react';
import Loading from './Loading'
import Failed from './Failed'
import FoodsList from './FoodList'
import { connect } from 'react-redux'
import { loadFoodsThunk } from './LoadFoodsService'

const mapStateToProps = state =>
    state.foods

const mapDispatchToProps =
    { loadFoodsThunk }

const FoodsView = props => {
    
    useEffect(() => {
        props.loadFoodsThunk()
    }, [])

    if(props.isLoading) {
        return (<Loading />)
    }
    
    if(props.isError) {
        return (<Failed />)
    }

    return (
        <FoodsList foods={props.foods} />
    )
}

export default connect(
    mapStateToProps
    , mapDispatchToProps
)(FoodsView)