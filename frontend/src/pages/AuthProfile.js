/*

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


//Redux stuff
import { connect } from 'react-redux';

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

export class AuthProfile extends Component {
    render() {
        const { classes, user: { 
            address,
            applications,
            background_photo, 
            contact_email, 
            registration_email, 
            dog_breed_type, 
            handle,
            overview,
            tags,
            profile_photo,
            createdAt,
            phone,
            title,
            loading,
            authenticated
        }
        } = this.props; 
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
                        <img src = {profile_photo} />
                    </Grid>
                    <Grid item xs = {3}>
                        <p>{address}</p>
                    </Grid>
                    <Grid item xs = {0.5} className = {classes.icon}> 
                        <img src={AppIcon1} alt="phone" width="30" height="30" />
                    </Grid>
                    <Grid item xs = {3}>
                        <p>{phone}</p>
                    </Grid>
                    <Grid item xs = {0.5} className = {classes.icon}>
                        <img src={AppIcon2} alt="mail" width='30' height="30" />
                    </Grid>
                    <Grid item xs={2.5}>
                        <p>{registration_email}</p>
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
                            <p>{overview}</p>
                        </Grid>
                    </Grid>
                    <Grid container item xs = {4}>
                        <Grid item xs className = {classes.prof_button}>
                            <Button variant="contained" color="primary" fullWidth>
                                UpAuthProfile
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

const mapStateToProps = (state) => ({
    user: state.user
})

AuthProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(AuthProfile))

*/
import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import EmailIcon from '@material-ui/icons/Email';
import PetsIcon from '@material-ui/icons/Pets';
import InputAdornment from '@material-ui/core/InputAdornment';
import { InputBase } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/core/IconButton';
//Redux stuff
import { connect } from 'react-redux';

const styles = {
    root: {
        margin: '10px 10px 10px 10px',
        padding: '20px 10px 10px 10px',
        // textAlign: 'center',
    },
    subtitle: {
        margin: '10px 10px 10px 10px',
    },
    title_text: {
        fontWeight: 'bold',

    },
    icon: {
        margin: '2px 2px 2px 2px',
    },
    overview: {
        padding: '15px 15px 15px 15px',
    },
    button: {
        margin: '10px 10px 10px 10px',
        // padding: '10px 10px 10px 10px',
    }
};

export class AuthProfile extends React.Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        // send to server
    }

    render() {
        const { classes, user: { 
            address,
            applications,
            background_photo, 
            contact_email, 
            registration_email, 
            dog_breed_type, 
            handle,
            overview,
            tags,
            profile_photo,
            createdAt,
            phone,
            title,
            loading,
            authenticated
            }
        } = this.props; 

        return (
            <Grid container spacing={3} className={classes.root}>
                <Grid container item xs={12} direction='row' alignItems="baseline" justify="flex-start">
                    <Grid item xs={2}>
                        <Button>
                            <img src={profile_photo} width='100' height='100' />
                            <input 
                            type="file"
                            id="imageInput"
                            hidden="hidden" 
                            onChange={this.handleImageChange} 
                            />
                            <IconButton onClick ={this.handleEditPicture} className="button">
                                <EditIcon color="primary" />
                            </IconButton>
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h4" component="h4" >
                            <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={2} color="#000055">
                                {title}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <InputBase
                            id="breeder phone"
                            type='text'
                            value={phone}
                            startAdornment={
                                <InputAdornment position="start">
                                    <PhoneIphoneIcon />
                                </InputAdornment>
                            }
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <InputBase
                            id="breeder email"
                            type='email'
                            value={registration_email}
                            startAdornment={
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            }
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={12} direction='row' alignItems="baseline">
                    <Grid container item xs={8} direction="column">
                        <Grid item className={classes.subtitle}>
                            <Typography variant="h5" component="h5" >
                                <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                                    Overview
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Paper variant="outlined" className={classes.overview}>
                                {overview}
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container item xs={4} direction="column" alignItems="center">
                        <Grid item xs={5} className={classes.button}>
                            <Button variant="contained" color="secondary" component={Link} to="/view_applicatoins">
                                View Applications
                            </Button>
                        </Grid>
                        <Grid item xs={5} className={classes.button}>
                            <Button variant="contained" color="secondary" component={Link} to="/customize_application_form">
                                Customize Application Form
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h5" >
                        <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                            Boys / Sires
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h5" >
                        <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                            Girls / Dams
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h5" >
                        <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                            Available Puppies
                        </Box>
                    </Typography>
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

AuthProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withStyles(styles)(AuthProfile));
