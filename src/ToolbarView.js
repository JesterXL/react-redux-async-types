import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import { connect } from 'react-redux'
import { loadFoodsThunk, loadFoodsFailThunk } from './LoadFoodsService'
import { withStyles } from '@material-ui/core/styles' 

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    }
}

const ToolbarView = ({ classes, loadFoodsThunk, loadFoodsFailThunk, totalCalories }) => {
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <p>Total Calories: {totalCalories}</p>
                    <p className={classes.grow}>&nbsp;</p>
                    <Button color="inherit" onClick={loadFoodsThunk}>Reload</Button>
                    <Button color="secondary" onClick={loadFoodsFailThunk}>Break</Button>
                </Toolbar>
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