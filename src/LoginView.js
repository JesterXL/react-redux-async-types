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
    },
    loginFailureText: {
        color: '#990000'
    }
  })

const mapStateToProps = state =>
    state

const mapDispatchToProps = dispatch =>
    ({
        onLogin: loginThunk(dispatch)
    })

const onPasswordKeyDown = setPassword => login => event => {
    
    if(event.key === 'Enter') {
        return [
            setPassword(event.target.value),
            login()
        ]
    }
    return [setPassword(event.target.value)]
}

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
                    onKeyPress={onPasswordKeyDown(setPassword)(() => onLogin(username)(password))}
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
                    onKeyPress={onPasswordKeyDown(setPassword)(() => onLogin(username)(password))}
                    onChange={event => setPassword(event.target.value)}
                />
                <Button
                    variant="contained" 
                    color="primary"
                    className={classes.loginButton}
                    onClick={() => onLogin(username)(password)}>Login</Button>
                <h3 className={classes.loginFailureText}>Login Failed: {error.message}</h3>
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
            console.log("1. LoggedOutView") ||
            loggedOutView(classes, username, setUsername, password, setPassword, props.onLogin),
        LoggingIn: () => 
            console.log("2. loggingInView") ||
            loggingInView(),
        LoginSuccess: () => 
            console.log("3. loginSuccessView") ||
            loginSuccessView(),
        LoginError: ({ error }) =>
            console.log("4. loginFailureView") ||
            loginFailureView(classes, username, setUsername, password, setPassword, props.onLogin, error)
    })
}

export default connect(
    mapStateToProps
    , mapDispatchToProps
)(withStyles(styles)(LoginView))