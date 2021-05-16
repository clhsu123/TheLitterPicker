import React, { Component } from 'react'
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import SearchBar from './searchBar';

// redux stuff
import { connect } from 'react-redux';

const styles = {
    appBar: {
        // backgroundcolor: 'yellow',
        // backgroundcolor: 'transparent',
    },
    title: {
        margin: '10px 10px 10px 10px',
    },
    box: {
        padding: '10px 10px 10px 10px',
        margin: '10px 10px 10px 10px',
        flexGrow: 1,
    },
    searchBar: {
        // color: 'secondary',
        // flexGrow: 2,
    },
    signup: {
        margin: '10px 10px 10px 10px',
    },
    login: {
        margin: '10px 10px 10px 10px',
    },
    text: {
        textAlign: 'center'
    }
};

export class new_Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
                    <Button className={classes.title} color="black" disableFocusRipple disableRipple component={Link} to="/">
                        TheLitterPicker.com
                    </Button>
                    <Box className={classes.box}>
                        <SearchBar />
                    </Box>
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
                            : <Grid container>
                                <Avatar src={profile_photo} />
                            </Grid>
                    }
                </Toolbar>
            </AppBar>
        )
    }
}

new_Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(new_Navbar));