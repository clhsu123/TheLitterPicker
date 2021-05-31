import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import { InputBase } from '@material-ui/core';
import { PhotoList } from '../components/PhotoList';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import IconButton from '@material-ui/core/IconButton';

//Redux
import { connect } from 'react-redux';

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
        // fontFamily: 'Impact',
    },
    button: {
        margin: '10px 10px 10px 10px',
    },
    photolist: {
        display: 'flex',
        flexDirection: 'row',
    },
    rootNews: {
        margin: '10px 10px 10px 10px',
        maxWidth: 600,
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        //height: 50,
        paddingLeft: theme.spacing(4),
        // backgroundColor: theme.palette.background.default,
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
        backgroundColor: theme.palette.background.paper,
        margin: '10px 0px 10px 10px',
    },
    gridList: {
        width: "auto",
        height: "auto"
    },
    gridListTile: {
        // minHeight: '400px',
        minWidth: '320px',
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
    gendersubtitle: {
        margin: '0px 10px 0px 10px',
    },
    newsAndUpdatesSubtitle: {
        margin: '10px 10px 10px 10px',
    }
});

let maxSteps = tutorialSteps.length;
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            breeder_info: this.props.history.location.state?.breeder_info,
            dogs_info: [],
            boys_info: [],
            girls_info: [],
            puppies_info: [],
            activeStep: 0,
            sireStep: 0,
            damStep: 0,
            puppyStep: 0,
            selectedDog: null,
            alert_sign_as_petowner: false,
        };
        this.classifyDogInfo = this.classifyDogInfo.bind(this);
        this.handleViewApplicationsClicked = this.handleViewApplicationsClicked.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleAlertDialogClose = this.handleAlertDialogClose.bind(this);
    }

    handleOnClick() {
        // console.log('clicked');
        // this.props.history.push('/application', { breeder_info: this.state.breeder_info });

        const { user } = this.props;
        if (user.accountType == "petowner") {
            this.props.history.push('/application', { breeder_info: this.state.breeder_info });
        } else {
            this.setState({
                alert_sign_as_petowner: true
            });
        }
    }

    handleAlertDialogClose() {
        this.setState({
            alert_sign_as_petowner: false,
        });
    }

    handleViewApplicationsClicked() {
        console.log("view applications");
        this.props.history.push('/view_applicatoins', { breeder_info: this.state.breeder_info });
    }

    classifyDogInfo = (dogs_data) => {
        // var dogs = this.state.dogs_info;
        var dogs = dogs_data;
        var boys = [];
        var girls = [];
        var puppies = [];
        var i, d;
        console.log(dogs);

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
        console.log(boys);
        this.setState({
            boys_info: boys,
            girls_info: girls,
            puppies_info: puppies,
        });
        console.log(this.state.boys_info);
    }

    componentDidMount() {
        axios
            .post('/get_dog_by_breeder_handle', { 'handle': this.state.breeder_info.handle })
            .then(res => {
                this.classifyDogInfo(res.data);
                this.setState({
                    dogs_info: res.data
                });
            })
            .catch(err => console.log(err));
        axios
            .post('/get_news_by_handle', { 'handle': this.state.breeder_info.handle })
            .then(res => {
                this.setState({ news: res.data });
                maxSteps = res.data.length;
                console.log(maxSteps);
                console.log(this.state.news);
            })
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
        console.log("clicked");
        console.log("tile");
    }

    handleClose = () => {
        this.setState({ selectedDog: null });
    }


    render() {
        const { classes, theme, user } = this.props;
        const breeder_info = this.state.breeder_info;
        return (
            <Grid container spacing={3} className={classes.root}>
                <Grid container item xs={12} direction='row' alignItems="baseline" justify="flex-start">
                    <Grid item xs={2}>
                        <Button>
                            <img src={breeder_info.profile_photo} width='100' height='100' />
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h4" component="h4" >
                            <Box fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={2} color="#000055">
                                {breeder_info.title}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
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
                    <Grid item xs={3}>
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
                        </Grid>
                        <Grid item>
                            <Paper variant="outlined" className={classes.overview}>
                                {breeder_info.overview}
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container item xs={4} direction="column" alignItems="center">
                        <Grid item xs={5} className={classes.button}>
                            <Button variant="contained" color="secondary" onClick={this.handleOnClick}>
                                Apply Applications
                            </Button>
                            <Dialog
                                open={this.state.alert_sign_as_petowner}
                                onClose={this.handleAlertDialogClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"You Are Not A Pet Owner User"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Please sign up as a pet owner user to apply for puppies application.
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleAlertDialogClose} color="primary">
                                        Close
                                    </Button>
                                    <Button onClick={this.handleAlertDialogClose} color="primary" autoFocus component={Link} to="/signup">
                                        Sign Up
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    {/* <h1>News and Updates</h1>1 */}
                    <Grid item className={classes.newsAndUpdatesSubtitle}>
                        <Typography variant="h5" component="h5">
                            <Box fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                                News and Updates
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                    { this.state.news.length != 0 ?
                        <div className={classes.rootNews}>
                            <Paper square elevation={0} className={classes.header}>
                                <Typography>{this.state.news[this.state.activeStep].content}</Typography>
                            </Paper>
                            <AutoPlaySwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={this.state.activeStep}
                                onChangeIndex={this.handleStepChange}
                                enableMouseEvents
                            >
                                {this.state.news.map((step, index) => (
                                    <div key={index}>
                                        {Math.abs(this.state.activeStep - index) <= 2 ? (
                                            <img className={classes.img} src={step.photo} alt={step.content} />
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
                        :
                        <h1></h1>
                        }
                    </Grid>
                </Grid>

                <Grid container item xs={12} className={classes.newsAndUpdatesSubtitle}>
                    <Typography variant="h5" component="h5" >
                        <Box fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                            Dogs Information
                        </Box>
                    </Typography>
                </Grid>

                <Grid item xs={12} className={classes.subtitle}>
                    <Grid container item xs={12} className={classes.gendersubtitle}>
                        <Typography variant="h5" component="h5" >
                            <Box fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                                Boys / Sires
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                        <div className={classes.galleryRoot}>
                            <GridList cols={3} className={classes.gridList}>
                                {this.state.boys_info.map(dog => (
                                    <GridListTile key={dog.dogId} className={classes.gridListTile}>
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
                                        <IconButton
                                            edge="start"
                                            color="inherit"
                                            onClick={this.handleClose}
                                            aria-label="close"
                                        >
                                            <CloseIcon />
                                        </IconButton>
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

                <Grid item xs={12} className={classes.subtitle}>
                    <Grid container item xs={12} className={classes.gendersubtitle}>
                        <Typography variant="h5" component="h5" >
                            <Box fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                                Girls / Dams
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                        <div className={classes.galleryRoot} >
                            <GridList cols={3} className={classes.gridList}>
                                {this.state.girls_info.map(dog => (
                                    <GridListTile key={dog.dogId} className={classes.gridListTile}>
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
                                        <IconButton
                                            edge="start"
                                            color="inherit"
                                            onClick={this.handleClose}
                                            aria-label="close"
                                        >
                                            <CloseIcon />
                                        </IconButton>
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
                <Grid item xs={12} className={classes.subtitle}>
                    <Grid container item xs={12} className={classes.gendersubtitle}>
                        <Typography variant="h5" component="h5" >
                            <Box fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                                Available puppies
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid container item xs={12}>
                        <div className={classes.galleryRoot}>
                            <GridList cols={3} className={classes.gridList}>
                                {this.state.puppies_info.map(dog => (
                                    <GridListTile key={dog.dogId} className={classes.gridListTile}>
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
                                        <IconButton
                                            edge="start"
                                            color="inherit"
                                            onClick={this.handleClose}
                                            aria-label="close"
                                        >
                                            <CloseIcon />
                                        </IconButton>
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
                {/* <Grid item className={classes.subtitle}>
                    <Typography variant="h5" component="h5" >
                        <Box fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                            Boys / Sires
                        </Box>
                    </Typography>
                </Grid>
                <Grid container item direction="row">
                    <PhotoList dogs_list={this.state.boys_info} />
                </Grid>
                <Grid item xs={12} className={classes.subtitle}>
                    <Typography variant="h5" component="h5" >
                        <Box fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                            Girls / Dams
                        </Box>
                    </Typography>
                </Grid>
                <Grid container item direction="row">
                    <PhotoList dogs_list={this.state.girls_info} />
                </Grid>
                <Grid item xs={12} className={classes.subtitle}>
                    <Typography variant="h5" component="h5" >
                        <Box fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                            Available Puppies
                        </Box>
                    </Typography>
                </Grid>
                <Grid container item direction="row" >
                    <PhotoList dogs_list={this.state.puppies_info} />
                </Grid> */}
            </Grid>
        );
    }
}


const mapStateToProps = (state) => ({
    user: state.user
});
Profile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};
export default connect(mapStateToProps)(withRouter(withStyles(styles, { withTheme: true })(Profile)));