import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import { connect } from 'react-redux'
import { loadFoodsThunk } from './LoadFoodsService'

const ToolbarView = ({ loadFoodsThunk }) => {
    return (
        <AppBar position="static">
            <Toolbar>
            <Button color="inherit" onClick={loadFoodsThunk}>Reload</Button>
            <Button color="inherit" color="secondary">Break</Button>
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = state =>
    state

const mapDispatchToProps =
    { loadFoodsThunk }
    
export default connect(
    mapStateToProps
    , mapDispatchToProps
)(ToolbarView)