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
import InputAdornment from '@material-ui/core/InputAdornment';
import { InputBase } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import EditBreederDetails from '../components/EditBreederDetails';
import AddDogs from '../components/AddDogs';

//Redux stuff
import { connect } from 'react-redux';
import { logoutUser, uploadBreederProfileImage } from '../redux/actions/userActions';

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
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadBreederProfileImage(formData);
    };

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };
    
    handleLogout = () => {
        this.props.logoutUser();
        this.props.history.push('/');
    };

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
                            <Tooltip title="Edit profile picture" placement="top">
                                <IconButton onClick ={this.handleEditPicture} className="button">
                                    <EditIcon color="primary" />
                                </IconButton>
                            </Tooltip>
                        </Button>
                        <Tooltip title="Logout" placement="top">
                            <iconButton onClick={this.handleLogout}>
                                <KeyboardReturn color="primary" />
                            </iconButton>
                        </Tooltip>
                        <p>這裏</p>
                        <EditBreederDetails />
                        <p>這裏</p>
                        <p>這裏</p>
                        <AddDogs />
                        <p>這裏</p>
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

const mapActionsToProps = { logoutUser, uploadBreederProfileImage };

AuthProfile.propTypes = {
    uploadBreederProfileImage: PropTypes.func.isRequired,
    logoutUser: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(AuthProfile));
