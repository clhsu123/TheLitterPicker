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
import EditDogs from '../components/EditDogs';
import AddNews from '../components/AddNews';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import EditPenIcon from '@material-ui/icons/Edit';

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
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";


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
    galleryRoot: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper
    },
    gridList: {
        width: "auto",
        height: "auto"
    },
    appBar: {
        diplay: "flex",
        justifyContent: 'flex-end',
        position: "relative",
    },
    imgIcon: {
        color: "rgba(255, 255, 255, 0.54)"
    },
    galleryImg: {
        display: 'block',
        margin: 'auto',
        maxHeight: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        position: 'relative',
    },
    addPictureButton: {
        marginLeft: 'auto'
    },
    editDogButton: {
        margin: '10px 0px 10px 10px',
    }
});

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export class AuthBreederProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dogs_info: [],
            boys_info: [],
            girls_info: [],
            puppies_info: [],
            activeStep: 0,
            sireStep: 0,
            damStep: 0,
            puppyStep: 0,
            selectedDog: null
        };
        this.classifyDogInfo = this.classifyDogInfo.bind(this);
        this.handleViewApplicationsClicked = this.handleViewApplicationsClicked.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleAddDogPicClicked = this.handleAddDogPicClicked.bind(this);
        this.handleEditDogClicked = this.handleEditDogClicked.bind(this);
    }
    handleImageChange = (event) => {
        console.log("changed");
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

    handleAddDogPicClicked() {
        console.log('add dog');
    }
    
    handleEditDogClicked() {
        console.log('edit dog');
    }

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
        this.setState({ activeStep: this.state.activeStep + 1 });
    };

    handleSireNext = () => {
        this.setState({ sireStep: this.state.sireStep + 1 });
    }

    handleDamNext = () => {
        this.setState({ damStep: this.state.damStep + 1 });
    }

    handlePuppyNext = () => {
        this.setState({ puppyStep: this.state.puppyStep + 1 });
    }

    handleBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1 });
    };

    handleSireBack = () => {
        this.setState({ sireStep: this.state.sireStep - 1 });
    };

    handleDamBack = () => {
        this.setState({ damStep: this.state.damStep - 1 });
    };

    handlePuppyBack = () => {
        this.setState({ puppyStep: this.state.puppyStep - 1 });
    };

    handleStepChange = (step) => {
        this.setState({ activeStep: step });
    };

    handleSireStepChange = (step) => {
        this.setState({ sireStep: step });
    };

    handleDamStepChange = (step) => {
        this.setState({ damStep: step });
    };

    handlePuppyStepChange = (step) => {
        this.setState({ puppyStep: step });
    };

    handleClickOpen = dog => {
        this.setState({ selectedDog: dog });
        this.setState({ damStep: 0, sireStep: 0, puppyStep: 0 });
        console.log("clicked");
        console.log("tile");
    }

    handleClose = () => {
        this.setState({ selectedDog: null });
    }



    render() {
        const { classes, theme, user } = this.props;
        const breeder_info = user;
        return (
            <Grid container spacing={3} className={classes.root}>
                <Grid container item xs={12} direction='row' alignItems="baseline" justify="flex-start">
                    <Grid item xs={2}>
                        <AddNews />
                        <EditDogs info = {{dogId: "FXpHO16mvheX4YN9N8xK"}}/>
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
                            <Button variant="contained" color="primary" onClick={this.handleEditPicture}>
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
                                <Box fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
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

                <Grid container item xs={12}>
                    <Grid container item xs={12}>
                        <Typography variant="h5" component="h5" >
                            <Box fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                            News and Updates
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid container item xs={12}>
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
                    <Grid container item xs={12}>
                        <Typography variant="h5" component="h5" >
                            <Box fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                                Boys / Sires
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                        <div className={classes.galleryRoot}>
                            <GridList cols={3}>
                                className={classes.gridList}
                                {this.state.boys_info.map(dog => (
                                    <GridListTile key={dog.dogId}>
                                        <img src={dog.images[0]} alt={dog.name} onClick={() => this.handleClickOpen(dog)} />
                                        <GridListTileBar
                                            title={dog.name}
                                            subtitle={<span>Birthdate: {dog.birthdate}</span>}
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                            <Dialog
                                open={this.state.selectedDog !== null}
                                onClose={this.handleClose}
                                TransitionComponent={Transition}
                            >
                                <AppBar className={classes.appBar}>
                                    <Toolbar>
                                        <Grid container direction='row' justify="space-between" alignItems="center">
                                                <Grid item>
                                                    <IconButton
                                                        edge="start"
                                                        color="inherit"
                                                        onClick={this.handleClose}
                                                        aria-label="close"
                                                        >
                                                        <CloseIcon />
                                                    </IconButton>
                                                </Grid>
                                                {/* <button className={classes.addPictureButton}> add picture </button> */}
                                                <Grid item >
                                                    <Button onClick={this.handleAddDogPicClicked} variant="contained" color="secondary" className={classes.editDogButton} startIcon={<AddPhotoAlternateIcon />}>
                                                        Add Dog Pic
                                                    </Button>
                                                    <EditDogs info = {this.state.selectedDog} />
                                                    {/*
                                                    <Button onClick={this.handleEditDogClicked} variant="contained" color="secondary" className={classes.editDogButton} startIcon={<EditPenIcon/>}>
                                                        Edit Dog
                                                    </Button>
                                                    */}
                                                </Grid>
                                            </Grid>
                                    </Toolbar>
                                </AppBar>
                                {this.state.selectedDog && (
                                    <>
                                        {console.log("how many images: " + this.state.selectedDog.images.length)}
                                        <Typography variant="subtitle1"> {this.state.selectedDog.name} </Typography>
                                        <Grid container item xs={12}>
                                            <div className={classes.rootNews}>
                                                <Paper square elevation={0} className={classes.header}>
                                                    <Typography variant="subtitle1"> {this.state.selectedDog.description} </Typography>
                                                </Paper>
                                                <AutoPlaySwipeableViews
                                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                                    index={this.state.sireStep}
                                                    onChangeIndex={this.handleSireStepChange}
                                                    enableMouseEvents
                                                >
                                                    {this.state.selectedDog.images.map((step, index) => (
                                                        <div key={index}>
                                                            {Math.abs(this.state.sireStep - index) <= 2 ? (
                                                                <img className={classes.img} src={step} />
                                                            ) : null}
                                                        </div>
                                                    ))}
                                                </AutoPlaySwipeableViews>
                                                <MobileStepper
                                                    steps={this.state.selectedDog.images.length}
                                                    position="static"
                                                    variant="text"
                                                    activeStep={this.state.sireStep}
                                                    nextButton={
                                                        <Button size="small" onClick={this.handleSireNext} disabled={this.state.sireStep === this.state.selectedDog.images.length - 1}>
                                                            Next
                                                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                                        </Button>
                                                    }
                                                    backButton={
                                                        <Button size="small" onClick={this.handleSireBack} disabled={this.state.sireStep === 0}>
                                                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                                    Back
                                                </Button>
                                                    }
                                                />
                                            </div>
                                        </Grid>
                                    </>
                                )}
                            </Dialog>
                        </div>
                    </Grid>
                </Grid>

                <Grid item className={classes.subtitle}>
                    <Grid container item xs={12}>
                        <Typography variant="h5" component="h5" >
                            <Box fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                                Girls / Dams
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                        <div className={classes.galleryRoot}>
                            <GridList cols={3}>
                                className={classes.gridList}
                                {this.state.girls_info.map(dog => (
                                    <GridListTile key={dog.dogId}>
                                        <img src={dog.images[0]} alt={dog.name} onClick={() => this.handleClickOpen(dog)} />
                                        <GridListTileBar
                                            title={dog.name}
                                            subtitle={<span>Birthdate: {dog.birthdate}</span>}
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                            <Dialog
                                open={this.state.selectedDog !== null}
                                onClose={this.handleClose}
                                TransitionComponent={Transition}
                            >
                                <AppBar className={classes.appBar}>
                                <Toolbar>
                                        <Grid container direction='row' justify="space-between" alignItems="center">
                                            <Grid item>
                                                <IconButton
                                                    edge="start"
                                                    color="inherit"
                                                    onClick={this.handleClose}
                                                    aria-label="close"
                                                    >
                                                    <CloseIcon />
                                                </IconButton>
                                            </Grid>
                                            {/* <button className={classes.addPictureButton}> add picture </button> */}
                                            <Grid item >
                                                <Button onClick={this.handleAddDogPicClicked} variant="contained" color="secondary" className={classes.editDogButton} startIcon={<AddPhotoAlternateIcon />}>
                                                    Add Dog Pic
                                                </Button>
                                                <EditDogs info = {this.state.selectedDog} />
                                                {/*
                                                <Button onClick={this.handleEditDogClicked} variant="contained" color="secondary" className={classes.editDogButton} startIcon={<EditPenIcon/>}>
                                                    Edit Dog
                                                </Button>
                                                */}
                                            </Grid>
                                        </Grid>
                                    </Toolbar>
                                </AppBar>
                                {this.state.selectedDog && (
                                    <>
                                        {console.log("how many images: " + this.state.selectedDog.images.length)}
                                        <Typography variant="subtitle1"> {this.state.selectedDog.name} </Typography>
                                        <Grid container item xs={12}>
                                            <div className={classes.rootNews}>
                                                <Paper square elevation={0} className={classes.header}>
                                                    <Typography variant="subtitle1"> {this.state.selectedDog.description} </Typography>
                                                </Paper>
                                                <AutoPlaySwipeableViews
                                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                                    index={this.state.damStep}
                                                    onChangeIndex={this.handleDamStepChange}
                                                    enableMouseEvents
                                                >
                                                    {this.state.selectedDog.images.map((step, index) => (
                                                        <div key={index}>
                                                            {Math.abs(this.state.damStep - index) <= 2 ? (
                                                                <img className={classes.img} src={step} />
                                                            ) : null}
                                                        </div>
                                                    ))}
                                                </AutoPlaySwipeableViews>
                                                <MobileStepper
                                                    steps={this.state.selectedDog.images.length}
                                                    position="static"
                                                    variant="text"
                                                    activeStep={this.state.damStep}
                                                    nextButton={
                                                        <Button size="small" onClick={this.handleDamNext} disabled={this.state.damStep === this.state.selectedDog.images.length - 1}>
                                                            Next
                                                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                                        </Button>
                                                    }
                                                    backButton={
                                                        <Button size="small" onClick={this.handleDamBack} disabled={this.state.damStep === 0}>
                                                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                                    Back
                                                </Button>
                                                    }
                                                />
                                            </div>
                                        </Grid>
                                    </>
                                )}
                            </Dialog>
                        </div>
                    </Grid>
                </Grid>

                {/* <Grid container item direction="row">
                    <PhotoList dogs_list={this.state.girls_info} />
                </Grid> */}
                <Grid item className={classes.subtitle}>
                    <Grid container item xs={12}>
                        <Typography variant="h5" component="h5" >
                            <Box fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                                Available puppies
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                        <div className={classes.galleryRoot}>
                            <GridList cols={3}>
                                className={classes.gridList}
                                {this.state.puppies_info.map(dog => (
                                    <GridListTile key={dog.dogId}>
                                        <img src={dog.images[0]} alt={dog.name} onClick={() => this.handleClickOpen(dog)} />
                                        <GridListTileBar
                                            title={dog.name}
                                            subtitle={<span>Birthdate: {dog.birthdate}</span>}
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                            <Dialog
                                open={this.state.selectedDog !== null}
                                onClose={this.handleClose}
                                TransitionComponent={Transition}
                            >
                                <AppBar className={classes.appBar}>
                                    <Toolbar>
                                        <Grid container direction='row' justify="space-between" alignItems="center">
                                            <Grid item>
                                                <IconButton
                                                    edge="start"
                                                    color="inherit"
                                                    onClick={this.handleClose}
                                                    aria-label="close"
                                                    >
                                                    <CloseIcon />
                                                </IconButton>
                                            </Grid>
                                            {/* <button className={classes.addPictureButton}> add picture </button> */}
                                            <Grid item >
                                                <Button onClick={this.handleAddDogPicClicked} variant="contained" color="secondary" className={classes.editDogButton} startIcon={<AddPhotoAlternateIcon />}>
                                                    Add Dog Pic
                                                </Button>
                                                <EditDogs info = {this.state.selectedDog} />
                                                {/*
                                                <Button onClick={this.handleEditDogClicked} variant="contained" color="secondary" className={classes.editDogButton} startIcon={<EditPenIcon/>}>
                                                    Edit Dog
                                                </Button>
                                                */}
                                            </Grid>
                                        </Grid>
                                    </Toolbar>
                                </AppBar>
                                {this.state.selectedDog && (
                                    <>
                                        {console.log("how many images: " + this.state.selectedDog.images.length)}
                                        <Typography variant="subtitle1"> {this.state.selectedDog.name} </Typography>
                                        <Grid container item xs={12}>
                                            <div className={classes.rootNews}>
                                                <Paper square elevation={0} className={classes.header}>
                                                    <Typography variant="subtitle1"> {this.state.selectedDog.description} </Typography>
                                                </Paper>
                                                <AutoPlaySwipeableViews
                                                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                                    index={this.state.puppyStep}
                                                    onChangeIndex={this.handlePuppyStepChange}
                                                    enableMouseEvents
                                                >
                                                    {this.state.selectedDog.images.map((step, index) => (
                                                        <div key={index}>
                                                            {Math.abs(this.state.puppyStep - index) <= 2 ? (
                                                                <img className={classes.img} src={step} />
                                                            ) : null}
                                                        </div>
                                                    ))}
                                                </AutoPlaySwipeableViews>
                                                <MobileStepper
                                                    steps={this.state.selectedDog.images.length}
                                                    position="static"
                                                    variant="text"
                                                    activeStep={this.state.puppyStep}
                                                    nextButton={
                                                        <Button size="small" onClick={this.handlePuppyNext} disabled={this.state.puppyStep === this.state.selectedDog.images.length - 1}>
                                                            Next
                                                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                                        </Button>
                                                    }
                                                    backButton={
                                                        <Button size="small" onClick={this.handlePuppyBack} disabled={this.state.puppyStep === 0}>
                                                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                                    Back
                                                </Button>
                                                    }
                                                />
                                            </div>
                                        </Grid>
                                    </>
                                )}
                            </Dialog>
                        </div>
                    </Grid>
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