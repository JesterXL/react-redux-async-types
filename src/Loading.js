import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    progress: {
      margin: theme.spacing.unit * 2,
    },
  });

const Loading = ({ classes }) => {
    return (
        <div>
            <CircularProgress className={classes.progress} />
            <p>Loading, one moment please...</p>
        </div>

    )
}

export default withStyles(styles)(Loading)