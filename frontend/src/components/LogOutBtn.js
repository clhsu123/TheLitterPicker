import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

// Redux stuff
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';

export class LogOutButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleLogout = () => {
        this.props.logoutUser();
        // this.props.history.push('/');
    };

    render() {
        const { classes } = this.props;
        return (
            <Tooltip title="Logout" placement="top">
                {/* <IconButton onClick={this.handleLogout}>
                    <KeyboardReturn color="primary" />
                </IconButton> */}
                <Button variant="contained" color="secondary" onClick={this.handleLogout} component={Link} to="/">
                    Log Out
                </Button>
            </Tooltip>
        )
    }
}

const mapActionsToProps = { logoutUser };
const mapStateToProps = (state) => ({
    user: state.user
});

LogOutButton.propTypes = {
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(LogOutButton);