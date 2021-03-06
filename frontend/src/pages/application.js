import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { MenuItem } from '@material-ui/core';

// redux stuff
import { connect } from 'react-redux';
import { getPetOwnerData } from '../redux/actions/userActions';

const useStyles = theme => ({
    appBar: {
      position: 'relative',
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
    stepper: {
      padding: theme.spacing(3, 0, 5),
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  });

const steps = ['Address and Contact', 'Inquiry Information', 'Review your application'];

export class application extends Component {
    constructor(props){
        super(props);
        this.state = {
            breederHandle: this.props.history.location.state?.breeder_info.handle,
            phone: '',
            email: '',
            firstname: '',
            lastname: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            currentLivingStatus: '',
            fullyFencedYard: false,
            areaOfInterest: '',
            currentDog: false,
            preferredGender: '',
            generalPreference: '',
            preferenceOriented: false,
            additionInformation: '',
            createdAt: '',
            activeStep: 0
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCheckBox = (event) => {
      this.setState({
        [event.target.name]: event.target.checked
      })
    }

    handleOnClick = (event) => {
      if(this.state.activeStep === (steps.length-1)){
        this.handleSubmit(event);
        this.setState({ activeStep: this.state.activeStep + 1})
      }
      else{
        this.setState({ activeStep: this.state.activeStep + 1})
      } 
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newApplication = {
            handle: this.state.breederHandle,
            phone: this.state.phone,
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            address1: this.state.address1,
            address2: this.state.address2,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            country: this.state.country,
            currentLivingStatus: this.state.currentLivingStatus,
            fullyFencedYard: this.state.fullyFencedYard,
            areaOfInterest: this.state.areaOfInterest,
            currentDog: this.state.currentDog,
            preferredGender: this.state.preferredGender,
            generalPreference: this.state.generalPreference,
            preferenceOriented: this.state.preferenceOriented,
            additionInformation: this.state.additionInformation,
        };
        axios
            .post('/add_application_secure', newApplication)
        this.props.getPetOwnerData();
    };

    getStepContent(step) {
      switch (step) {
        case 0:
          return this.AddressForm();
        case 1:
          return this.InquiryInformation();
        case 2:
          return this.Review();
        default:
          throw new Error('Unknown step');
      }
    }
  
  Checkout() {
      const { classes } = this.props;
      return (
        <React.Fragment>
          <CssBaseline />
          <AppBar position="absolute" color="default" className={classes.appBar}>
          </AppBar>
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="center">
                Application Form
              </Typography>
              <Stepper activeStep={this.state.activeStep} className={classes.stepper}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {this.state.activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your application!
                    </Typography>
                    <Typography variant="subtitle1">
                      Your application has been sent to the breeder.
                      You  can view your applications in your profile.
                      Any update of your applications will be sent to your message box.
                    </Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {this.getStepContent(this.state.activeStep)}
                    <div className={classes.buttons}>
                      {this.state.activeStep !== 0 && (
                        <Button onClick={() => this.setState({ activeStep: this.state.activeStep - 1})} className={classes.button}>
                          Back
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleOnClick}
                        className={classes.button}
                      >
                        {this.state.activeStep === steps.length - 1 ? 'Apply' : 'Next'}
                      </Button>
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
          </main>
        </React.Fragment>
      );
  }
  
  AddressForm() {
      return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Address and Contact
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Contact phone"
              fullWidth
              autoComplete="contact phone number"
              value={this.state.phone}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="firstName"
              name="firstname"
              label="First name"
              fullWidth
              autoComplete="given-name"
              value={this.state.firstname}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="lastName"
              name="lastname"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              value={this.state.lastname}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              value={this.state.address1}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              value={this.state.address2}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              value={this.state.city}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            value={this.state.state}
            onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              value={this.state.zip}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              value={this.state.country}
              onChange={this.handleChange}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
  
  InquiryInformation(){
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Inquiry Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="current-living-status"
              label="Current Living Status"
              name="currentLivingStatus"
              fullWidth
              select
              value={this.state.currentLivingStatus}
              onChange={this.handleChange}
              >
                  <MenuItem value={"singleFamilyHouse"}>Single Family House</MenuItem>
                  <MenuItem value={"townHouse"}>Town House</MenuItem>
                  <MenuItem value={"condo"}>Condo</MenuItem>
                  <MenuItem value={"apartment"}>Apartment</MenuItem>
              </TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox 
                color="primary" 
                name="fullyFencedYard" 
                checked={this.state.fullyFencedYard}
                onChange={this.handleCheckBox}
                />}
              label="Does your home have a fully fenced yard?"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="area-of-interest"
              label="Area of Interest"
              name="areaOfInterest"
              fullWidth
              select
              value={this.state.areaOfInterest}
              onChange={this.handleChange}
              >
                  <MenuItem value={"show"}>Show/conformation</MenuItem>
                  <MenuItem value={"performance"}>Performance(obedience/agility etc.)</MenuItem>
                  <MenuItem value={"breeding"}>Breeding</MenuItem>
                  <MenuItem value={"companion"}>Pet/companion</MenuItem>
              </TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox 
                color="primary" 
                name="currentDog" 
                checked={this.state.currentDog}
                onChange={this.handleCheckBox}
                />}
              label="Do you currently own a dog?"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="gender"
              label="Preferred Gender"
              name="preferredGender"
              fullWidth
              select
              value={this.state.preferredGender}
              onChange={this.handleChange}
              >
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"male"}>Male</MenuItem>
              </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="puppy-preferences"
              label="Tell us your preference for coat, eye color, etc."
              name="generalPreference"
              multiline
              fullWidth
              variant="outlined"
              value={this.state.generalPreference}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox 
                color="primary"
                checked={this.state.preferenceOriented} 
                name="preferenceOriented"  
                onChange={this.handleCheckBox}
                />}
              label="These are my preferences, but I would consider a healthy puppy of another color."
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox 
                color="primary"
                disabled 
                checked={!this.state.preferenceOriented} 
                />}
              label="I only want a puppy of the color combination I indicated, and I will search until I find it."
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="applicant-comment"
              label="Any additional information that you want to share?"
              name="additionInformation"
              value={this.state.additionInformation}
              onChange={this.handleChange}
              multiline
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  Review(){
    return(
      <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Review Your Application
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            disabled
            id="phone"
            label="Contact phone"
            fullWidth
            value={this.state.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            disabled
            id="email"
            label="Email"
            fullWidth
            value={this.state.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            disabled
            id="firstName"
            label="First name"
            fullWidth
            value={this.state.firstname}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            disabled
            id="lastName"
            label="Last name"
            fullWidth
            value={this.state.lastname}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            disabled
            id="address1"
            label="Address line 1"
            fullWidth
            value={this.state.address1}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            disabled
            id="address2"
            label="Address line 2"
            fullWidth
            value={this.state.address2}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            disabled
            id="city"
            label="City"
            fullWidth
            value={this.state.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
          disabled
          id="state"
          label="State/Province/Region"
          fullWidth
          value={this.state.state}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            disabled
            id="zip"
            label="Zip / Postal code"
            fullWidth
            value={this.state.zip}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            disabled
            id="country"
            label="Country"
            fullWidth
            value={this.state.country}
          />
        </Grid>
      </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              disabled
              id="current-living-status"
              label="Current Living Status"
              fullWidth
              value={this.state.currentLivingStatus}
              />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox 
                disabled
                color="primary" 
                name="fullyFencedYard" 
                checked={this.state.fullyFencedYard}
                />}
              label="Does your home have a fully fenced yard?"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="area-of-interest"
              label="Area of Interest"
              fullWidth
              select
              value={this.state.areaOfInterest}
              ></TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox 
                disabled
                color="primary" 
                name="currentDog" 
                checked={this.state.currentDog}
                />}
              label="Do you currently own a dog?"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              disabled
              id="gender"
              label="Preferred Gender"
              fullWidth
              select
              value={this.state.preferredGender}
              ></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              disabled
              id="puppy-preferences"
              label="Tell us your preference for coat, eye color, etc."
              multiline
              fullWidth
              variant="outlined"
              value={this.state.generalPreference}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox 
                disabled
                color="primary"
                checked={this.state.preferenceOriented} 
                />}
              label="These are my preferences, but I would consider a healthy puppy of another color."
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox 
                color="primary"
                disabled 
                checked={!this.state.preferenceOriented} 
                />}
              label="I only want a puppy of the color combination I indicated, and I will search until I find it."
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              disabled
              id="applicant-comment"
              label="Any additional information that you want to share?"
              value={this.state.additionInformation}
              multiline
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
    </React.Fragment>
    
    );
  }

    render(){
      const { user } = this.props;
        return this.Checkout();
    }
}

application.propTypes = {
  getPetOwnerData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  user: state.user
})
const mapActionsToProps = {
  getPetOwnerData
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(useStyles, { withTheme: true })(application));