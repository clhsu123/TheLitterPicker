import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import { InputBase } from '@material-ui/core';
import { PhotoList } from '../components/PhotoList';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/core/IconButton';
import EditBreederDetails from '../components/EditBreederDetails';
import AddDogs from '../components/AddDogs';
// redux stuff
import { connect } from 'react-redux';
import { uploadBreederProfileImage } from '../redux/actions/userActions';
// axios
import axios from 'axios';

import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';


const tutorialSteps = [
    {
      label: 'We are thrilled that Crosswood Inertia was adopted by Zak George, a world-renown dog trainer. Follow him on Instagram, Facebook, and YouTube to learn invaluable techniques for training your dog. ',
      imgPath: 'http://nebula.wsimg.com/e36cd65ad068686a8a0f27be25893aa8?AccessKeyId=5E8626EAF8E328200F9E&disposition=0&alloworigin=1',
    },
    {
      label: 'Wisp, femail pup, 6 weeks, sold',
      imgPath:
        'http://nebula.wsimg.com/0b7d132c28a3cea4409771f9141c615f?AccessKeyId=5E8626EAF8E328200F9E&disposition=0&alloworigin=1',
    },
    {
      label: 'Crosswood Monreaux and Gibson pups, expected early April, 2021. $2000+ CADia',
      imgPath:
        'http://nebula.wsimg.com/381196e82a21a8737e072aafe1b6ca30?AccessKeyId=5E8626EAF8E328200F9E&disposition=0&alloworigin=1',
    },
    {
      label: 'Monreaux and Gibson previous litter',
      imgPath:
        'http://nebula.wsimg.com/0584d02692b5b2f5831b3eaa367c829c?AccessKeyId=5E8626EAF8E328200F9E&disposition=0&alloworigin=1',
    },
    {
      label: 'puppies',
      imgPath:
        'http://nebula.wsimg.com/93adbcc7db46dd9ece01b74618b3613c?AccessKeyId=5E8626EAF8E328200F9E&disposition=0&alloworigin=1',
    },
];

const maxSteps = tutorialSteps.length;



const styles = theme => ({
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
    },
    rootNews: {
        maxWidth: 600,
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        //height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    img: {
        display: 'block',
        margin: 'auto',
        height: 300,
        maxHeight: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        position: 'relative',
    },
});

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export class AuthBreederProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dogs_info: [],
            boys_info: [],
            girls_info: [],
            puppies_info: [],
            activeStep: 0,
        };
        this.classifyDogInfo = this.classifyDogInfo.bind(this);
        this.handleViewApplicationsClicked = this.handleViewApplicationsClicked.bind(this);
    }
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
    handleViewApplicationsClicked() {
        this.props.history.push('/view_applicatoins');
    };
    classifyDogInfo = (dogs_data) => {
        var dogs = dogs_data;
        var boys = [];
        var girls = [];
        var puppies = [];
        var i, d;

        for (var i = 0; i < dogs.length; i++) {
            d = dogs[i];
            if (d.isPuppy === true) {
                puppies.push(d);
            } else if (d.gender === "female") {
                girls.push(d);
            } else {
                boys.push(d);
            }
        }
        this.setState({
            boys_info: boys,
            girls_info: girls,
            puppies_info: puppies,
        });
    }

    componentDidMount() {
        const { classes, user } = this.props; 
        // get Dogs sub-collections data from the database
        axios
        .get('/get_dog')
        .then(res => {

            this.classifyDogInfo(res.data);
            this.setState({
                dogs_info: res.data
            });
        })
        .catch(err => console.log(err));
    }


    handleNext = () => {
        this.setState({ activeStep: this.state.activeStep + 1});
    };
    
    handleBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1});
    };
    
    handleStepChange = (step) => {
        this.setState({ activeStep: step });
    };



    render() {
        const { classes, theme, user} = this.props;
        const breeder_info = user;
        return (
            <Grid container spacing={3} className={classes.root}>
                <Grid container item xs={12} direction='row' alignItems="baseline" justify="flex-start">
                    <Grid item xs={2}>
                        <Button>
                            <img src={breeder_info.profile_photo} width='100' height='100' />
                        </Button>
                        <input 
                            type="file"
                            id="imageInput"
                            hidden="hidden"
                            onChange={this.handleImageChange} 
                        />
                        <Tooltip title="Edit profile picture" placement="top">
                            <Button variant="contained" color="primary"onClick ={this.handleEditPicture}>
                                Edit
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Typography variant="h4" component="h4" >
                            <Box fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={2} color="#000055">
                                {breeder_info.title}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <InputBase
                            id="breeder phone"
                            type='text'
                            value={breeder_info.phone}
                            startAdornment={
                                <InputAdornment position="start">
                                    <PhoneIphoneIcon />
                                </InputAdornment>
                            }
                        />
                    </Grid>
                    <Grid item>
                        <InputBase
                            id="breeder email"
                            type='email'
                            value={breeder_info.contact_email}
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
                            <AddDogs />
                        </Grid>
                        <Grid item>
                            <Paper variant="outlined" className={classes.overview}>
                                {breeder_info.overview}
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container item xs={4} direction="column" alignItems="center">
                        <Grid item xs={5} className={classes.button}>
                                <EditBreederDetails />
                        </Grid>
                        <Grid item xs={5} className={classes.button}>
                            <Button variant="contained" color="secondary" onClick={this.handleViewApplicationsClicked}>
                                View Applications
                            </Button>
                        </Grid>
                        <Grid item xs={5} className={classes.button}>
                            {/*
                            <Button variant="contained" color="secondary" component={Link} to="/customize_application_form">
                                Customize Application Form
                            </Button>
                            */}
                        </Grid>
                    </Grid>
                </Grid>


                <Grid container item xs = {12}>
                    <h1>News and Updates</h1>
                    <Grid container item xs = {12}>
                        <div className={classes.rootNews}>
                            <Paper square elevation={0} className={classes.header}>
                                <Typography>{tutorialSteps[this.state.activeStep].label}</Typography>
                            </Paper>
                            <AutoPlaySwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={this.state.activeStep}
                                onChangeIndex={this.handleStepChange}
                                enableMouseEvents
                            >
                                {tutorialSteps.map((step, index) => (
                                <div key={step.label}>
                                    {Math.abs(this.state.activeStep - index) <= 2 ? (
                                    <img className={classes.img} src={step.imgPath} alt={step.label} />
                                    ) : null}
                                </div>
                                ))}
                            </AutoPlaySwipeableViews>
                            <MobileStepper
                                steps={maxSteps}
                                position="static"
                                variant="text"
                                activeStep={this.state.activeStep}
                                nextButton={
                                <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === maxSteps - 1}>
                                    Next
                                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                </Button>
                                }
                                backButton={
                                <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                    Back
                                </Button>
                                }
                            />
                        </div>
                    </Grid>
                </Grid>


                <Grid item className={classes.subtitle}>
                    <Typography variant="h5" component="h5" >
                        <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                            Boys / Sires
                        </Box>
                    </Typography>
                </Grid>
                <Grid container item direction="row">
                    <PhotoList dogs_list={this.state.boys_info} />
                </Grid>
                <Grid item xs={12} className={classes.subtitle}>
                    <Typography variant="h5" component="h5" >
                        <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                            Girls / Dams
                        </Box>
                    </Typography>
                </Grid>
                <Grid container item direction="row">
                    <PhotoList dogs_list={this.state.girls_info} />
                </Grid>
                <Grid item xs={12} className={classes.subtitle}>
                    <Typography variant="h5" component="h5" >
                        <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                            Available Puppies
                        </Box>
                    </Typography>
                </Grid>
                <Grid container item direction="row">
                    <PhotoList dogs_list={this.state.puppies_info} />
                </Grid>
            </Grid>
        );
    }
}

AuthBreederProfile.propTypes = {
    uploadBreederProfileImage: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadBreederProfileImage: PropTypes.func.isRequired
};
const mapActionsToProps = { uploadBreederProfileImage };
const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles, { withTheme: true })(AuthBreederProfile));