import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ApplicationList from '../components/ApplicationList';
import { Button, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
            petowner_info: {},
        };
    }

    componentDidMount() {
        // testing
        var petowner_data = {
            applications: ['aHsrSjZiNVqOituvfZBW', 'caOfscXFQHT9iQzEcX8I', 'dCebRRD10WKdrWRxmtwN'],
            handle: 'marcytucker',
            password: 'vampvampmarcy',
            profile_photo: 'https://firebasestorage.googleapis.com/v0/b/pickerpicker-3e855.appspot.com/o/no-img.png?alt=media&token=782cdd95-8d4d-434b-8e2a-f57d7dace598',
            registration_email: 'marceline1999@gmail.com',
            selfIntro: 'I am a dog lover, and currently seeking for cute shiba and chihuahua puppies.'
        }
        const petowner_info = petowner_data;
        this.setState({ petowner_info: petowner_info });

    }

    render() {
        const { classes } = this.props;
        const petowner_info = this.state.petowner_info;
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid container item xs={12} direction='row'>
                        <Button>
                            <img src={petowner_info.profile_photo} width='100' height='100' />
                        </Button>
                        <Grid item xs={12} sm={2} className={classes.username}>
                            <Typography variant="h5" component="h5" >
                                <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                                    {petowner_info.handle}
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} className={classes.update_profile}>
                            <Button variant="contained" color="secondary" component={Link} to="/update_profile">
                                Update Profile
                            </Button>
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
                            {petowner_info.selfIntro}
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
                        {/* <BreederInfoList breeders={this.state.breeders} /> */}
                        <ApplicationList application_ids={petowner_info.applications} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(PetOwner);