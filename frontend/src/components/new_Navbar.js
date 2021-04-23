import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = {
    text: {
        textAlign: 'center'
    }
};

export class new_Navbar extends Component {
    render() {
        const { classes } = this.props; 
        return (
            <AppBar>
            <Toolbar>
            <Grid container spacing = {1} className={classes.text}>
                <Grid item xs>
                <Button color="inherit" component={Link} to ="/login">
                    Login
                </Button>
                </Grid>
                <Grid item xs = {8}>
                <Button color="inherit" component={Link} to ="/">
                    Home
                </Button>
                </Grid>
                <Grid item xs>
                <Button color="inherit" component={Link} to ="/signup">
                    Signup
                </Button>
                </Grid>
            </Grid>
            </Toolbar>
        </AppBar>
        )
    }
}

new_Navbar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(new_Navbar)
