import React, { Component,  Fragment} from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// MUI stuff
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckIcon from '@material-ui/icons/Check';
import ToggleButton from '@material-ui/lab/ToggleButton';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        breed: "",
        gender: "",
        images: [],
        isPuppy: false,
        name: "",
        videos: [],
        loading: false
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
    };

    handleImageChangeDog = (event) => {
        this.setState({ loading: true });
        const image = event.target.files[0];
        // send to server
        const formData = new FormData();
        formData.append('image', image, image.name);
        axios
        .post('/dogImage', formData)
        .then(res => {
            this.setState({ images: [res.data.imageUrl],
                            loading: false
                            });
        })
    };

    handleEditPictureDog = () => {
        const fileInput = document.getElementById('imageInputDog');
        fileInput.click();
    }

    handleSubmit = () => {
        const dogDetails = {
            birthdate: this.state.birthdate,
            description: this.state.description,
            breed: this.state.breed,
            gender: this.state.gender,
            images: this.state.images,
            isPuppy: this.state.isPuppy,
            name: this.state.name,
            videos: []
        };  
        axios
            .post('/add_dog_to_breeder', dogDetails)
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
                                name = "breed"
                                type = "text"
                                label = "Breed"
                                placeholder = "Dog breed type"
                                className={classes.textField}
                                value={this.state.breed}
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
                            <br /><br />
                            <input 
                            type="file"
                            id="imageInputDog"
                            hidden="hidden"
                            onChange={this.handleImageChangeDog} 
                            />
                            <Tooltip title="Edit dog picture" placement="top">
                                <Button variant="contained" color="primary" onClick ={this.handleEditPictureDog}>
                                    Add Picture
                                </Button>
                            </Tooltip>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color = "primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color = "primary" disabled={this.state.loading}>
                            Save
                            {this.state.loading && (
                                <CircularProgress size = {20} className={classes.progress}/>
                            )}
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
