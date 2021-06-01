import React, { Component, Fragment } from 'react'
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
import { MenuItem } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';

// axios
import axios from 'axios';

const styles = {
    deletedog: {
        margin: '10px 10px 10px 10px',
    }
};

export class DeleteDogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            dogId: this.props.info.dogId,
        };
    };
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false })  
    };

    handleSubmit = () =>{
        axios
        .post('/delete_dog', {"dogId": this.state.dogId})
        .then(res => {
            console.log(res);
        })
        this.handleClose();
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <Tooltip title="delete dogs" placement="top">
                    <Button variant="contained" color="primary" onClick={this.handleOpen} className={classes.deletedog} startIcon={<DeleteIcon />} >
                        Delete Dog
                    </Button>                
                </Tooltip>
                <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm">
                    <DialogTitle>Confirm</DialogTitle>
                    <DialogContent>
                        <h2>Are you sure you want to delete the document?</h2>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color = "primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color = "primary" disabled={this.state.loading}>
                            Delete
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

DeleteDogs.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(DeleteDogs)
