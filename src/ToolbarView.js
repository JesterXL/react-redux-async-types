import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import { connect } from 'react-redux'
import { loadFoodsThunk, loadFoodsFailThunk } from './LoadFoodsService'
import { withStyles } from '@material-ui/core/styles' 
import { Router } from "@reach/router"
import ChickenImage from './chicken.png'

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    }
}

const foodLogoStyles = {
    width: '36px',
    height: '36px',
    paddingRight: '0.5em'
}
const logoStyles = {
    display: 'flex',
    alignItems: 'center'
}
const ChickenLogo = () => {
    return (
        <div style={logoStyles}>
            <img src={ChickenImage} style={foodLogoStyles} alt="Food" />
            <span>Macro Counter</span>
        </div>
    )
}

const BlankToolbar = () => {
    return (
        <div>
                <Toolbar>
                    <ChickenLogo />
                </Toolbar>
        </div>
    )
}

const FoodToolbar = ({ classes, loadFoodsThunk, loadFoodsFailThunk, totalCalories }) => {
    return (
        <div path="foods">
            <Toolbar>
                <ChickenLogo />
                <p>Total Calories: <span data-cy-total-calories>{totalCalories}</span></p>
                <p className={classes.grow}>&nbsp;</p>
                <Button color="inherit" onClick={loadFoodsThunk} data-cy-button="reload">Reload</Button>
                <Button color="secondary" onClick={loadFoodsFailThunk}>Break</Button>
            </Toolbar>
        </div>
    )
}

const ToolbarView = props => {
    return (
        <div className={props.classes.root}>
            <AppBar position="static">
                <Router>
                    <BlankToolbar path="/"></BlankToolbar>
                    <FoodToolbar {...props} path="foods"></FoodToolbar>
                </Router>
            </AppBar>
        </div>
    )
}

const mapStateToProps = state =>
    ({ totalCalories: state.calories.totalCalories })

const mapDispatchToProps = dispatch =>
    ({ 
        loadFoodsThunk: loadFoodsThunk(dispatch)
        , loadFoodsFailThunk: loadFoodsFailThunk(dispatch)
    })
    
export default connect(
    mapStateToProps
    , mapDispatchToProps
)(withStyles(styles)(ToolbarView))