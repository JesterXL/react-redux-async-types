import React, { useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import { loadFoodsThunk, loadFoodsFailThunk } from './LoadFoodsService'
import { withStyles } from '@material-ui/core/styles' 
import { Store, Provider } from './store'

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    }
}

// loadFoodsThunk, loadFoodsFailThunk, totalCalories
const ToolbarView = ({ classes }) => {
    const { state, dispatch } = useContext(Store)
    const { calories } = state
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <p>Total Calories: {calories.totalCalories}</p>
                    <p className={classes.grow}>&nbsp;</p>
                    <Button color="inherit" onClick={loadFoodsThunk(dispatch)}>Reload</Button>
                    <Button color="secondary" onClick={loadFoodsFailThunk(dispatch)}>Break</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withStyles(styles)(ToolbarView)