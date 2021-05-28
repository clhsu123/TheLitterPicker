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

class EditDogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            dogId: this.props.info.dogId,
            open : false,
            birthdate: this.props.info.birthdate,
            description: this.props.info.description,
            gender: this.props.info.gender,
            isPuppy: this.props.info.isPuppy,
            name: this.props.info.name
        };
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
    handleImageChangeDogs = (event) => {
        this.setState({ loading: true });
        const image = event.target.files[0];
        // send to server
        const formData = new FormData();
        formData.append('image', image, image.name);
        // Make chnages to fit the news photo here
        axios
        .post('/dogImage', formData)
        .then(res => {
            console.log(res.data);
            this.setState({ 
                loading: false
            });
            axios
            .post('/dogImageInformation', { dogId: this.state.dogId, imageUrl: res.data.imageUrl})
            .then(res => {
                console.log(res);
            })
        })
    };


    handleEditPictureDogs = () => {
        const fileInput = document.getElementById('EditDogInput');
        fileInput.click();
    }
    handleSubmit = () => {
        const dogDetails = {
            dogId: this.state.dogId,
            birthdate: this.state.birthdate,
            description: this.state.description,
            gender: this.state.gender,
            isPuppy: this.state.isPuppy,
            name: this.state.name,
        };  
        console.log(dogDetails);
        axios
            .post('/update_dog', dogDetails)
        this.handleClose();
    };

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title="Edit details" placement="top">
                    <Button variant="contained" color="primary" onClick={this.handleOpen}>
                        Edit Dogs
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
                            <br /><br />
                            <input 
                            type="file"
                            id="EditDogInput"
                            hidden="hidden"
                            onChange={this.handleImageChangeDogs} 
                            />
                            <Tooltip title="Edit dog picture" placement="top">
                                <Button variant="contained" color="primary" onClick ={this.handleEditPictureDogs}>
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

EditDogs.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EditDogs)
