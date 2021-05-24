import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ApplicationList from '../components/ApplicationList';
import { Button, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/core/IconButton';
//Redux stuff
import { connect } from 'react-redux';
import { uploadPetOwnerProfileImage } from '../redux/actions/userActions';

//Edit Detail Component
import EditPetDetails from '../components/EditPetDetails';

const styles = {
    root: {
        margin: '10px 10px 10px 10px',
        padding: '50px 10px 10px 10px',
    },
    subtitle: {
        margin: '10px 10px 10px 10px',
    },
    username: {
        margin: '10px 10px 10px 10px',
        padding: '0px 0px 0px 20px',
        flexGrow: 1,
        
    },
    selfIntro: {
        padding: '10px 10px 10px 10px',        
    },
    profile_photo: {
        width: '50px',
        height: '50px',
    },
    update_profile: {
        margin: '10px 10px 10px 10px',
        textAlign: "right",
        // flexDirection: 'row',
        // alignSelf: 'flex-end'
    },
    overview: {
        padding: '10px 10px 10px 10px',
    }
};

export class PetOwner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleImageChange = (event) => {
        const image = event.target.files[0];
        // send to server
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadPetOwnerProfileImage(formData);
    };
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };

    render() {
        const { classes, user } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid container item xs={12} direction='row'>
                        <Button>
                            <img src={user.profile_photo} width='100' height='100' />
                        </Button>
                        <input 
                            type="file"
                            id="imageInput"
                            hidden="hidden"
                            onChange={this.handleImageChange} 
                        />
                        <Tooltip title="Edit profile picture" placement="top">
                                <Button variant="contained" color="primary">
                                    Edit
                                </Button>
                        </Tooltip>
                        <Grid item xs={12} sm={2} className={classes.username}>
                            <Typography variant="h5" component="h5" >
                                <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                                    {user.handle}
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} className={classes.update_profile}>
                            <EditPetDetails />
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h5" component="h5" >
                            <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                                Self Intro
                            </Box>
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper variant="outlined" className={classes.selfIntro}>
                            {user.selfIntro}
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h5" component="h5" >
                            <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                                My Applications
                            </Box>
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <ApplicationList application_ids={user.application_list} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    user: state.user
});
const mapActionsToProps = { uploadPetOwnerProfileImage };
PetOwner.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    uploadPetOwnerProfileImage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PetOwner));