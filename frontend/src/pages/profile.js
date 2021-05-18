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
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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
});

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export class profile extends Component {
    constructor(){
        super();
        this.state = {
            activeStep: 0,
        }
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
