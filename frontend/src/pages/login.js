import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import AppIcon from '../images/dog_lover.png';
import SmileCollieLogo from '../images/smile_collie_logo.png';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
// Redux stuff
import { connect } from 'react-redux';
import { loginBreeder, loginPetOwner } from '../redux/actions/userActions'
//MUI stuff

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


export class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
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
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginBreeder(userData, this.props.history);
    };
    handleSubmitPetOwner = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginPetOwner(userData, this.props.history);
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        const { classes, UI: { loading} } = this.props; 
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={SmileCollieLogo} alt="smile_collie_logo" width = "300" height = "300" className={classes.logo}/>
                    <Typography variant="h4" className={classes.pageTitle}>
                        Log In
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
                        <TextField id="password"
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
                        <small> Don't have an account? Sign up <Link to="/signup">here</Link> </small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginBreeder: PropTypes.func.isRequired,
    loginPetOwner: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) =>({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginBreeder,
    loginPetOwner
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))