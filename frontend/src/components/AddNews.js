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
import CircularProgress from '@material-ui/core/CircularProgress';
import PostAddIcon from '@material-ui/icons/PostAdd';

// axios
import axios from 'axios';

const styles = {
    progress: {
        position: 'absolute'
      }
};

class AddNews extends Component {
    state = {
        open : false,
        title: "",
        content: "",
        photo:"",
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


    handleImageChangeNews = (event) => {
        this.setState({ loading: true });
        const image = event.target.files[0];
        // send to server
        const formData = new FormData();
        formData.append('image', image, image.name);
        // Make chnages to fit the news photo here
        axios
        .post('/newsImage', formData)
        .then(res => {
            console.log(res.data);
            this.setState({ 
                photo: res.data.imageUrl,
                loading: false
            });
        })
    };


    handleEditPictureNews = () => {
        const fileInput = document.getElementById('imageInputNews');
        fileInput.click();
    }

    handleSubmit = () => {
        const newsDetails = {
            title: this.state.title,
            content: this.state.content,
            photo: this.state.photo,
        };  
        axios
            .post('/add_news_to_breeder', newsDetails)
        this.handleClose();
    };

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title="add news" placement="right">
                    <Button variant="contained" color="primary" onClick={this.handleOpen} startIcon={<PostAddIcon />}>
                        Add News
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
                                name = "title"
                                type = "text"
                                label = "Title"
                                placeholder = "Title"
                                className={classes.textField}
                                value={this.state.title}
                                onChange = {this.handleChange}
                                fullWidth
                            />
                            <TextField
                                name = "content"
                                type = "text"
                                label = "Content"
                                placeholder = "Content"
                                multiline
                                rows = "3"
                                className={classes.textField}
                                value={this.state.content}
                                onChange = {this.handleChange}
                                fullWidth
                            />
                            <br /><br />
                            <input 
                            type="file"
                            id="imageInputNews"
                            hidden="hidden"
                            onChange={this.handleImageChangeNews} 
                            />
                            <Tooltip title="Edit dog picture" placement="top">
                                <Button variant="contained" color="primary" onClick ={this.handleEditPictureNews}>
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

AddNews.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AddNews)
