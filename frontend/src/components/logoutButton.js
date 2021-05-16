import React, { Component } from 'react'

//Redux stuff
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';
export class logoutButton extends Component {
    handleLogout = () => {
        this.props.logoutUser;
    };
    render() {
        return (
            <Tooltip title="Logout" placement="top">
                <iconButton onClick={this.handleLogout}>
                    <KeyboardReturn color="primary" />
                </iconButton>
            </Tooltip>
        )
    }
}

const mapActionsToProps = { logoutUser };

logoutButton.propTypes = {
    logoutUser: PropTypes.func.isRequired
};

export default connect(mapActionsToProps)(logoutButton);
