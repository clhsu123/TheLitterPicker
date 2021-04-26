import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AppIcon1 from '../images/phone.png';
import AppIcon2 from '../images/mail.png';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = {
    pic: {
        textAlign: 'center'
    },
    icon: {
        margin: 'auto'
    },
    prof_button: {
        width: '10'
    }
};

export class profile extends Component {
    render() {
        const { classes } = this.props; 
        return (
            <Grid container spacing = {1}>
                <Grid container item xs = {12}>
                    <Grid item sm>
                        <p>Pic one</p>
                    </Grid>
                    <Grid item sm>
                        <p>Pic two</p>
                    </Grid>
                    <Grid item sm>
                        <p>Pic three</p>
                    </Grid>
                </Grid>
                <Grid container item xs = {12}>
                    <Grid item xs = {3}> 
                        <p>pic</p>
                    </Grid>
                    <Grid item xs = {3}>
                        <p>name</p>
                    </Grid>
                    <Grid item xs = {0.5} className = {classes.icon}> 
                        <img src={AppIcon1} alt="phone" width="30" height="30" />
                    </Grid>
                    <Grid item xs = {3}>
                        <p>Phone number</p>
                    </Grid>
                    <Grid item xs = {0.5} className = {classes.icon}>
                        <img src={AppIcon2} alt="mail" width='30' height="30" />
                    </Grid>
                    <Grid item xs={2.5}>
                        <p>chelunh1@uci.edu</p>
                    </Grid>
                </Grid>
                <Grid container item xs = {12}>
                    <Grid container item xs = {8}>
                        <Grid container item xs = {8}>
                        <Grid item sm>
                            <Button variant="outlined" color="primary">
                                Boys/Sires
                            </Button>
                        </Grid>
                        <Grid item sm>
                            <Button variant="outlined" color="primary">
                                Girls/Dams
                            </Button>
                        </Grid>
                        <Grid item sm>
                            <Button variant="outlined" color="primary">
                                Available Puppies
                            </Button>
                        </Grid>
                        </Grid>
                        <Grid container item xs = {8}>
                            <h1>This is a website designed and developed by Eric Hsu, a currently enrolled graduate student at UC Irvine.  Go check my fucking codes.</h1>
                        </Grid>
                        <Grid container item xs = {8}>
                            <p>Just some information regarding web development...</p>
                        </Grid>
                    </Grid>
                    <Grid container item xs = {4}>
                        <Grid item xs className = {classes.prof_button}>
                            <Button variant="contained" color="primary" fullWidth>
                                Upadate Profile
                            </Button>
                            <br /><br />
                            <Button variant="contained" color="primary" fullWidth>
                                View Applications
                            </Button>
                            <br /><br />
                            <Button variant="contained" color="primary" fullWidth>
                                Customize Application Form
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid container item xs = {12}>
                    <h1>New features to be developed...</h1>
                </Grid>
            </Grid>
        )
    }
}

profile.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(profile)
