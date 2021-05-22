import React, { Component,  Fragment} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// redux stuff
import { connect } from 'react-redux';

// MUI stuff
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckIcon from '@material-ui/icons/Check';
import ToggleButton from '@material-ui/lab/ToggleButton';

// axios
import axios from 'axios';
//Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = {
    
};

class AddDogs extends Component {
    state = {
        open : false,
        birthdate: "",
        description: "",
        gender: "",
        images: [],
        isPuppy: false,
        name: "",
        videos: []
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

    setSelected = (input) => {
        this.setState({ isPuppy: input});
        console.log(this.state.isPuppy);
    };

    handleSubmit = () => {
        const dogDetails = {
            birthdate: this.state.birthdate,
            description: this.state.description,
            gender: this.state.gender,
            images: [],
            isPuppy: this.state.isPuppy,
            name: this.state.name,
            videos: []
        };  
        axios
            .post('/add_dog_to_breeder', dogDetails)
            .then(res => {
                console.log(res.data);
            });
        this.handleClose();
    };

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title="Edit details" placement="top">
                    <Button variant="contained" color="primary" onClick={this.handleOpen}>
                        Add Dogs
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
                                name = "name"
                                type = "text"
                                label = "Name"
                                placeholder = "Dog's name"
                                className={classes.textField}
                                value={this.state.name}
                                onChange = {this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name = "birthdate"
                                type = "text"
                                label = "Birthdate"
                                placeholder = "Dog's birthdate"
                                className={classes.textField}
                                value={this.state.birthdate}
                                onChange = {this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name = "description"
                                type = "text"
                                label = "Description"
                                placeholder = "Tell something about this dog"
                                className={classes.textField}
                                value={this.state.description}
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
                                name = "gender"
                                type = "text"
                                label = "Gender"
                                placeholder = "male or female?"
                                className={classes.textField}
                                value={this.state.gender}
                                onChange = {this.handleChange}
                                fullWidth
                            />
                            <p>Is it a puppy?</p>
                            <ToggleButton
                                value="check"
                                selected={this.state.isPuppy}
                                onChange={()=>{this.setState({isPuppy:!this.state.isPuppy})}}
                            >
                            <CheckIcon />
                            </ToggleButton>
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

AddDogs.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddDogs)
