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
    },
    update_button: {
        margin: '10 10 10 10'
    }
};

export class profile extends Component {
    render() {
        const { classes } = this.props; 
        return (
            <Grid container spacing = {1}>
                <Grid container item xs = {12} alignItems = 'center' spacing = {1}>
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
                        <Grid container item xs = {8} alignItems="center" className = {classes.overview}>
                            <Grid item sm>
                                <h1>Overview</h1>
                            </Grid>
                            <Grid item sm>
                                <Button variant="outlined" color="primary" className = {classes.update_button}>
                                    update
                                </Button>
                            </Grid>
                            <Grid item sm/>
                        </Grid>
                        <Grid container item xs = {8}>
                            <p>Coming from only the purest and finest of bloodlines, we have carefully selected which dogs we breed. We are intentional ...</p>
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
                    <h1>News and Updates</h1>
                </Grid>

                <Grid container item xs = {12} spacing = {1} alignItems = 'center'>
                    <Grid item sm>
                        <p>Pic 1</p>
                    </Grid>
                    <Grid item sm>
                        <p>Pic 2</p>
                    </Grid>
                    <Grid item sm>
                        <p>Pic 3</p>
                    </Grid>
                    <Grid item sm>
                        <Button variant="outlined" color="primary">
                            more
                        </Button>
                    </Grid>
                </Grid>

                <Grid container item xs = {12}>
                    <h1>Sires</h1>
                </Grid>

                <Grid container item xs = {12} spacing = {1} alignItems = 'center'>
                    <Grid item sm>
                        <p>Pic 1</p>
                    </Grid>
                    <Grid item sm>
                        <p>Pic 2</p>
                    </Grid>
                    <Grid item sm>
                        <p>Pic 3</p>
                    </Grid>
                    <Grid item sm>
                        <Button variant="outlined" color="primary">
                            more
                        </Button>
                    </Grid>
                </Grid>

                <Grid container item xs = {12}>
                    <h1>Dams</h1>
                </Grid>

                <Grid container item xs = {12} spacing = {1} alignItems = 'center'>
                    <Grid item sm>
                        <p>Pic 1</p>
                    </Grid>
                    <Grid item sm>
                        <p>Pic 2</p>
                    </Grid>
                    <Grid item sm>
                        <p>Pic 3</p>
                    </Grid>
                    <Grid item sm>
                        <Button variant="outlined" color="primary">
                            more
                        </Button>
                    </Grid>
                </Grid>

                <Grid container item xs = {12}>
                    <h1>Available Puppies</h1>
                </Grid>

                <Grid container item xs = {12} spacing = {1} alignItems = 'center'>
                    <Grid item sm>
                        <p>Pic 1</p>
                    </Grid>
                    <Grid item sm>
                        <p>Pic 2</p>
                    </Grid>
                    <Grid item sm>
                        <p>Pic 3</p>
                    </Grid>
                    <Grid item sm>
                        <Button variant="outlined" color="primary">
                            more
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

profile.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(profile)
