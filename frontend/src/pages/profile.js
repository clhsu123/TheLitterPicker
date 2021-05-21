import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AppIcon1 from '../images/phone.png';
import AppIcon2 from '../images/mail.png';
import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';


import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

const imagesList = [
    {
      id: 1,
      src: "http://nebula.wsimg.com/93adbcc7db46dd9ece01b74618b3613c?AccessKeyId=5E8626EAF8E328200F9E&disposition=0&alloworigin=1",
      title: "foo",
      description: "bar",
      author: "Rajini"
    },
    {
      id: 2,
      src: "http://nebula.wsimg.com/0b7d132c28a3cea4409771f9141c615f?AccessKeyId=5E8626EAF8E328200F9E&disposition=0&alloworigin=1",
      title: "foo",
      description: "bar",
      author: "Kamal"
    },
    {
      id: 3,
      src: "http://nebula.wsimg.com/93adbcc7db46dd9ece01b74618b3613c?AccessKeyId=5E8626EAF8E328200F9E&disposition=0&alloworigin=1",
      title: "foo",
      description: "bar",
      author: "Vijay"
    },
    {
      id: 4,
      src: "http://nebula.wsimg.com/0b7d132c28a3cea4409771f9141c615f?AccessKeyId=5E8626EAF8E328200F9E&disposition=0&alloworigin=1",
      title: "foo",
      description: "bar",
      author: "Ajith"
    },
    {
      id: 5,
      src: "http://nebula.wsimg.com/93adbcc7db46dd9ece01b74618b3613c?AccessKeyId=5E8626EAF8E328200F9E&disposition=0&alloworigin=1",
      title: "Sunset",
      description: "bar",
      author: "Sharukh"
    },
];

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


const useStyles = theme =>({
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
    },
    root: {
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
        position: "relative"
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
    }
});

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export class profile extends Component {
    constructor(){
        super();
        this.state = {
            activeStep: 0,
            selectedTile: null,
            value: ''
        }
        //this.displayGallery = this.displayGallery.bind(this);
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

    handleClickOpen = tile => {
        this.setState({ selectedTile: tile});
        console.log("clicked");
        console.log("tile");
    }

    handleClose = () => {
        this.setState({ selectedTile: null});
    }


    render() {
        const { classes, theme } = this.props; 
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
                    <Grid container item xs = {12}>
                        <div className={classes.root}>
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
                    <div className={classes.galleryRoot}>
                <GridList cols={3}>
                    className={classes.gridList}
                    {imagesList.map(tile => (
                        <GridListTile key={tile.id}>
                            <img src={tile.src} alt={tile.title} />
                                <GridListTileBar
                                    title={tile.title}
                                    subtitle={<span>by: {tile.author}</span>}
                                    actionIcon={
                                      <IconButton
                                        aria-label={`info about ${tile.title}`}
                                        className={classes.imgIcon}
                                        value={tile.id}
                                        onClick={() => this.handleClickOpen(tile)}
                                      >
                                        <InfoIcon />
                                      </IconButton>
                                    }
                                />
                        </GridListTile>
                    ))}
                </GridList>
                <Dialog
                    //fullScreen
                    open={this.state.selectedTile !== null}
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

                {this.state.selectedTile && (
                    <img className={classes.img} src={this.state.selectedTile.src} alt={this.state.selectedTile.title} />
                )}
                </Dialog>
            </div>
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

export default withStyles(useStyles, { withTheme: true })(profile);
