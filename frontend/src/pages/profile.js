import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = {
    pic: {
        textAlign: 'center'
    },
    something: {
        textAlign: 'center',
        color: 'red'
    }
};

export class profile extends Component {
    render() {
        const { classes } = this.props; 
        return (
            <Grid container spacing = {1}>
                    <Grid item xs = {4}>
                        <p>Pic one</p>
                    </Grid>
                    <Grid item xs = {4}>
                        <p>Pic two</p>
                    </Grid>
                    <Grid item xs = {4}>
                        <p>Pic three</p>
                    </Grid>

                    <Grid item xs = {12} className = {classes.something}>
                        <h1>Something</h1>
                    </Grid>
            </Grid>
        )
    }
}

profile.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(profile)
