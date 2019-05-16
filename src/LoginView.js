import React, { useState } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import { loginThunk } from './LoginService'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = theme => ({
    mainParent: {
        display: 'flex'
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
      width: '200px',
      margin: 'auto'
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    loginButton: {
        marginTop: '2em'
    }
  })

const mapStateToProps = state =>
    state

const mapDispatchToProps = dispatch =>
    ({
        onLogin: loginThunk(dispatch)
    })

const loggedOutView = (classes, username, setUsername, password, setPassword, onLogin) => {
    return (
        <div className={classes.mainParent}>
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="username"
                    label="Username"
                    margin="normal"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <TextField
                    id="password"
                    label="Password"
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <Button
                    variant="contained" 
                    color="primary"
                    className={classes.loginButton}
                    onClick={() => onLogin(username)(password)}>Login</Button>
            </form>
        </div>
    )
}

const loggingInView = () => {
    return (
        <div>
            <p>Logging in...</p>
            <CircularProgress />
        </div>
    )
}


const loginFailureView = (classes, username, setUsername, password, setPassword, onLogin, error) => {
    return (
        <div className={classes.mainParent}>
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="username"
                    label="Username"
                    margin="normal"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
                <TextField
                    id="password"
                    label="Password"
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <Button
                    variant="contained" 
                    color="primary"
                    className={classes.loginButton}
                    onClick={() => onLogin(username)(password)}>Login</Button>
                <h3>Login Failed: {error}</h3>
            </form>
        </div>
    )
}

const loginSuccessView = () => {
    return (
        <div>
            <div>Login successful!</div>
        </div>
    )
}

const LoginView = props => {
    console.log("LoginView::props:", props)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const { classes } = props

    return props.login.matchWith({
        LoggedOut: () => 
            loggedOutView(classes, username, setUsername, password, setPassword, props.onLogin),
        LoggingIn: () => 
            loggingInView(),
        LoginSuccess: () => 
            loginSuccessView(),
        LoginError: ({ error }) =>
            loginFailureView(classes, username, setUsername, password, setPassword, props.onLogin, error)
    })
}

export default connect(
    mapStateToProps
    , mapDispatchToProps
)(withStyles(styles)(LoginView))