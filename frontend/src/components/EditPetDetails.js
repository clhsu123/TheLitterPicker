import React, { Component,  Fragment} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// redux stuff
import { connect } from 'react-redux';
import { editPetOwnerDetails } from '../redux/actions/userActions';

// MUI stuff
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
    
}
class EditPetDetails extends Component {
    state = {
        open : false,
        applications: [],
        registration_email: "",
        selfIntro:"",
        profile_photo: "",
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false })  
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit = () => {
        const userDetails = {
            selfIntro: this.state.selfIntro
        };
        this.props.editPetOwnerDetails(userDetails);
        this.handleClose();
    };

    componentDidMount(){
        const { user } = this.props;
        this.mapPetOwnerDetailsToState(user);
    };

    mapPetOwnerDetailsToState = (user) => {
        this.setState({
            selfIntro: user.selfIntro? user.selfIntro : '',
            profile_photo: user.profile_photo? user.profile_photo : ''
        })
    };

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title="edit my profile" placement="top">
                    <Button variant="contained" color="primary" onClick={this.handleOpen}>
                        Update My Profile
                    </Button> 
                </Tooltip>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm">
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                name = "selfIntro"
                                type = "text"
                                label = "SelfIntro"
                                multiline
                                rows = "3"
                                placeholder = "A short overview about yourself"
                                className={classes.textField}
                                value={this.state.selfIntro}
                                onChange = {this.handleChange}
                                fullWidth
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color = "primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color = "primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditPetDetails.propTypes = {
    editPetOwnerDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { editPetOwnerDetails })(withStyles(styles)(EditPetDetails));
