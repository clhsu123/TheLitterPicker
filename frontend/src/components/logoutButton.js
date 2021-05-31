import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

//Redux stuff
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';

export class logoutButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    handleLogout = () => {
        this.props.logoutUser();
        this.props.history.push('/');
    };

    render() {
        return (
            <Button variant="contained" color="secondary" onClick={this.handleLogout}>
                Log Out
            </Button>
        )
    }
}

const mapActionsToProps = { logoutUser };

logoutButton.propTypes = {
    logoutUser: PropTypes.func.isRequired
};

export default connect(mapActionsToProps)(logoutButton);
