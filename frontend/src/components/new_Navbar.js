import React, { Component } from 'react'
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LogOutButton from './LogOutBtn';
import { Link } from 'react-router-dom';
import SearchBar from './searchBar';
import axios from 'axios';

// redux stuff
import { connect } from 'react-redux';

const styles = {
    appBar: {
        alignItems: 'space-between'
    },
    title: {
        margin: '10px 10px 10px 10px',
    },
    box: {
        padding: '10px 10px 10px 10px',
        margin: '10px 10px 10px 10px',
    },
    signup: {
        margin: '10px 10px 10px 10px',
    },
    login: {
        margin: '10px 10px 10px 10px',
    },
    avatar: {
        margin: '10px 10px 10px 10px',
    },
    text: {
        textAlign: 'center'
    },
    logout: {
        margin: '10px 0px 10px 10px',
    }
};

export class new_Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breeder_info: {}
        };
    }

    render() {
        const { classes, user: {
            handle,
            profile_photo,
            authenticated,
            accountType
        }
        } = this.props;
        return (
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Grid container direction='row' justify="space-between" alignItems="center">
                        <Grid item>
                            <Button className={classes.title} color="black" disableFocusRipple disableRipple component={Link} to="/">
                                TheLitterPicker.com
                            </Button>
                        </Grid>
                        <Grid item>
                            <Box className={classes.box}>
                                <SearchBar />
                            </Box>
                        </Grid>
                        <Grid item>
                            {
                                (!authenticated) ?
                                    <Grid container direction='row'>
                                        <Grid item>
                                            <Button className={classes.signup} variant="contained" color="secondary" component={Link} to="/signup">
                                                Sign up
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Button className={classes.login} variant="outlined" color="secondary" component={Link} to="/login">
                                                Log in
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    :
                                    <Grid container direction='row' alignItems="center">
                                        <Grid item>
                                            <Button component={Link} to={(accountType=='breeder') ? '/auth_breeder_profile' : '/petowner'}>
                                                <Grid container direction='row' alignItems="center">
                                                    <Grid item className={classes.avatar}>
                                                        <Avatar src={profile_photo} />
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="body1" >
                                                            <Box fontStyle="normal" fontWeight="fontWeightLight" letterSpacing={4} color="#000055">
                                                                {handle}
                                                            </Box>
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Button>
                                        </Grid>
                                        <Grid item className={classes.logout}>
                                            <LogOutButton />
                                        </Grid>
                                    </Grid>
                            }
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        )
    }
}

new_Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(new_Navbar));