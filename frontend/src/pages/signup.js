import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import CollieLogo from '../images/collie_logo.png';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

//MUI Stuff
import Grid from '@material-ui/core/Grid';


//Redux stuff
import { connect } from 'react-redux';
import { signupBreeder, signupPetOwner, logoutUser } from '../redux/actions/userActions';
const styles = {
    form: {
        textAlign: 'center'
      },
      image: {
        margin: '20px auto 20px auto'
      },
      pagetitle: {
        margin: '10px auto 10px auto'
      },
      textField: {
        margin: '10px auto 10px auto'
      },
      button: {
        marginTop: 20,
        position: 'relative'
      },
      customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
      },
      progress: {
        position: 'absolute'
      },
      logo: {
          margin: '40px 20px 20px 20px'
      }
};


export class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        };
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors});
        }
    }
    handleSubmitBreeder = (event) => {
        event.preventDefault();
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        this.props.signupBreeder(newUserData, this.props.history);
    };

    handleSubmitPetOwner = (event) => {
        event.preventDefault();
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupPetOwner(newUserData, this.props.history);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const { classes, UI: { loading } } = this.props; 
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={CollieLogo} alt="collie_logo" width = "300" height = "300" className={classes.logo}/>
                    <Typography variant="h4" className={classes.pageTitle}>
                        Sign Up
                    </Typography>
                    <form noValidate>
                        <TextField 
                            id="email"
                            name="email"
                            type="email" 
                            label="Email" 
                            className={classes.textField} 
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email} 
                            onChange={this.handleChange} 
                            fullWidth
                        />
                        <TextField 
                            id="password"
                            name="password" 
                            type="password" 
                            label="Password" 
                            className={classes.textField} 
                            helperText={errors.password} 
                            error={errors.password ? true : false}
                            value={this.state.password} 
                            onChange={this.handleChange} 
                            fullWidth
                        />
                        <TextField 
                            id="confirmPassword"
                            name="confirmPassword" 
                            type="password" 
                            label="Confirm Password" 
                            className={classes.textField} 
                            helperText={errors.confirmPassword} 
                            error={errors.confirmPassword ? true : false}
                            value={this.state.confirmPassword} 
                            onChange={this.handleChange} 
                            fullWidth
                        />
                        <TextField 
                            id="handle"
                            name="handle" 
                            type="text" 
                            label="Handle" 
                            className={classes.textField} 
                            helperText={errors.handle} 
                            error={errors.handle ? true : false}
                            value={this.state.handle} 
                            onChange={this.handleChange} 
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button 
                            type="submit" 
                            color="primary" 
                            className={classes.button}
                            disabled={loading}
                            onClick = {this.handleSubmitBreeder}
                        >
                            As Breeder
                            {loading && (
                                <CircularProgress size = {20} className={classes.progress}/>
                            )}
                        </Button>
                        <Button 
                            type="submit" 
                            color="primary" 
                            className={classes.button}
                            disabled={loading}
                            onClick = {this.handleSubmitPetOwner}
                        >
                            As User
                            {loading && (
                                <CircularProgress size = {20} className={classes.progress}/>
                            )}
                        </Button>
                        <br />
                        <small> Already have an account? Login <Link to="/login">here</Link> </small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    logoutUser: PropTypes.object.isRequired,
    signupBreeder: PropTypes.func.isRequired,
    signupPetOwner: PropTypes.func.isRequired
};


const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    signupBreeder,
    signupPetOwner
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(signup));