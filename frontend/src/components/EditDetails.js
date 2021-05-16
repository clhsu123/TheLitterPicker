import React, { Component,  Fragment} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// redux stuff
import { connect } from 'react-redux';
import { editBreederDetails } from '../redux/actions/userActions';

// MUI stuff
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
//Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = {
    
}
class EditDetails extends Component {
    state = {
        open : false,
        address: "",
        applications: [],
        background_photo: "",
        contact_email: "",
        registration_email: "",
        dog_breed_type: "",
        overview: "",
        selfIntro:"",
        tags: [],
        profile_photo: "",
        phone: "",
        title: "",
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
            address: this.state.address,
            contact_email: this.state.contact_email,
            dog_breed_type: this.state.dog_breed_type,
            overview: this.state.overview,
            phone: this.state.phone,
            title: this.state.title 
        };
        this.props.editBreederDetails(userDetails);
        this.handleClose();
    };

    componentDidMount(){
        const { user } = this.props;
        this.mapBreederDetailsToState(user);
    };

    mapBreederDetailsToState = (user) => {
        this.setState({
            address: user.address? user.address : '',
            background_photo: user.background_photo? user.background_photo : '',
            contact_email: user.contact_email? user.contact_email : '',
            dog_breed_type: user.dog_breed_type? user.dog_breed_type : '',
            overview: user.overview? user.overview : '',
            tags: user.tags? user.tags : [],
            profile_photo: user.profile_photo? user.profile_photo : '',
            phone: user.phone? user.phone : '',
            title: user.title? user.title : ''  
        })
    };

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title="Edit details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button} />
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
                                name = "overview"
                                type = "text"
                                label = "Overview"
                                multiline
                                rows = "3"
                                placeholder = "A short overview about yourself"
                                className={classes.textField}
                                value={this.state.overview}
                                onChange = {this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name = "address"
                                type = "text"
                                label = "Address"
                                placeholder = "Address"
                                className={classes.textField}
                                value={this.state.address}
                                onChange = {this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name = "contact_email"
                                type = "text"
                                label = "Contact_email"
                                placeholder = "contact email"
                                className={classes.textField}
                                value={this.state.contact_email}
                                onChange = {this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name = "dog_breed_type"
                                type = "text"
                                label = "Dog_breed_type"
                                placeholder = "Dog breed type"
                                className={classes.textField}
                                value={this.state.dog_breed_type}
                                onChange = {this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name = "phone"
                                type = "text"
                                label = "Phone"
                                placeholder = "Phone number"
                                className={classes.textField}
                                value={this.state.phone}
                                onChange = {this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name = "title"
                                type = "text"
                                label = "Title"
                                placeholder = "Title"
                                className={classes.textField}
                                value={this.state.title}
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

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps, { editBreederDetails })(withStyles(styles)(EditDetails));
