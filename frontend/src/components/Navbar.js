// import React, { Component } from 'react';
// import Link from 'react-router-dom/Link';
// // MUI stuff
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Button from '@material-ui/core/Button';

// export class Navbar extends Component {
//     render() {
//         return (
//             <AppBar>
//                 <Toolbar className="nav-container">
//                     <Button color="inherit" component={Link} to ="/login">
//                         Login
//                     </Button>
//                     <Button color="inherit" component={Link} to ="/">
//                         Home
//                     </Button>
//                     <Button color="inherit" component={Link} to ="/signup">
//                         Signup
//                     </Button>
//                 </Toolbar>
//             </AppBar>
//         )
//     }
// }

// export default Navbar

import React, { Component } from 'react'
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import SearchBar from './searchBar';

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

export class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { classes } = this.props;
        return (
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Button className={classes.title} color="black" disableFocusRipple disableRipple component={Link} to="/">
                        TheLitterPicker.com
                    </Button>
                    <Box className={classes.box}>
                        <SearchBar />
                    </Box>
                    <Button className={classes.signup} variant="contained" color="secondary" component={Link} to="/signup">
                        Sign up
                    </Button>
                    <Button className={classes.login} variant="outlined" color="secondary" component={Link} to="/login">
                        Log in
                    </Button>
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar)