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
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import { Link } from 'react-router-dom';
import SearchBar from './searchBar';

// redux stuff
import { connect } from 'react-redux';
import { ButtonBase } from '@material-ui/core';

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
                                    <Button>
                                        <Grid container direction='row' alignItems="center">
                                            <Grid item className={classes.avatar}>
                                                <Avatar src={profile_photo} />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body1" >
                                                    <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightLight" letterSpacing={4} color="#000055">
                                                        {handle}
                                                    </Box>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Button>
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
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(new_Navbar));