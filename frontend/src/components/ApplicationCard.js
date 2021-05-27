import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';

// redux stuff
import { connect } from 'react-redux';

const styles = {
    root: {
        margin: '5px 5px 5px 5px',
        display: 'flex'
    },
    card_content: {
        width: 1000,
    },
    tags: {
        // textDecoration: 'underline',
    },
    viewdetails: {
        margin: '5px 5px 5px 5px',
    },
    withdrawl: {
        margin: '5px 5px 5px 5px',
    },
    dialog_content: {
        display: 'flex',
    },
    dialog_content_title: {
        color: 'black'
    }
};

export class ApplicationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            application_status: '',
            detail_dialog_open: false,
        };
        this.handleViewDetailClicked = this.handleViewDetailClicked.bind(this);
        this.handleViewDetailClose = this.handleViewDetailClose.bind(this);
        this.handleApproveClicked = this.handleApproveClicked.bind(this);
        this.handleDeclineClicked = this.handleDeclineClicked.bind(this);
        this.handleApplicationWithdrawal = this.handleApplicationWithdrawal.bind(this);
    }

    handleViewDetailClicked() {
        this.setState({
            detail_dialog_open: true,
        });
    }

    handleViewDetailClose() {
        this.setState({
            detail_dialog_open: false,
        });
    }

    handleApproveClicked() {
        console.log('approve button is clicked');
        this.setState({
            application_status: 'approved'
        });
        // update this.props.info.status to be 1 using backend API
    }

    handleDeclineClicked() {
        console.log('approve button is clicked');
        this.setState({
            application_status: 'declined'
        });
        // update this.props.info.status to be 2 using backend API
    }
    
    handleApplicationWithdrawal() {
        console.log('withdrawal button is clicked');
    }

    componentDidMount() {
        if (this.props.info.status == 0) {
            this.setState({
                application_status: 'pending'
            })
        } else if (this.props.info.status == 1) {
            this.setState({
                application_status: 'approved'
            })
        } else {
            this.setState({
                application_status: 'declined'
            })
        }
    }



    render() {
        const { classes, user: {
            accountType,
        } } = this.props;
        const application_info = this.props.info;
        let d = application_info.createdAt;
        const year = d.substring(0, 4);
        const month = d.substring(5, 7)
        const day = d.substring(8, 10);
        const created_date = [year, month, day].join('-');
        return (
            <ListItem alignItems="flex-start">
                <Card className={classes.root}>
                    <div className={classes.card_content}>
                        <CardContent>
                            <Grid container xs={12} direction='row'>
                                <Grid item container xs={10} direction="column">
                                    <Grid container direction="row">
                                        <Grid item xs={2}>
                                            <Typography variant="body1">
                                                Breeder Info:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="body1" color="textSecondary">
                                                {application_info.breederHandle}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container direction="row">
                                        <Grid item xs={2}>
                                            <Typography variant="body1">
                                                Applied Date:
                                        </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body1" color="textSecondary">
                                                {created_date}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container direction="row">
                                        <Grid item xs={2}>
                                            <Typography variant="body1">
                                                Status:
                                        </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="body1" color="textSecondary">
                                                {this.state.application_status}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item container xs={2} direction="column">
                                    <Grid item>
                                        <Button className={classes.viewdetails} variant="contained" color="secondary" size='small' onClick={this.handleViewDetailClicked}>
                                            View Detail
                                        </Button>
                                        <Dialog fullWidth={true} open={this.state.detail_dialog_open} onClose={this.handleViewDetailClose} aria-labelledby="form-dialog-title">
                                            <DialogTitle id="form-dialog-title">Application Details</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText>
                                                    <Box className={classes.dialog_content}>
                                                        <Typography variant="body1" className={classes.dialog_content_title}>
                                                            Adopter Full Name:&nbsp;&nbsp;
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {application_info.firstname}&nbsp;
                                                            {application_info.lastname}
                                                        </Typography>
                                                    </Box>
                                                    <Box className={classes.dialog_content}>
                                                        <Typography variant="body1" className={classes.dialog_content_title}>
                                                            Adopter Username:&nbsp;&nbsp;
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {application_info.adopterHandle}
                                                        </Typography>
                                                    </Box>
                                                    <Box className={classes.dialog_content}>
                                                        <Typography variant="body1" className={classes.dialog_content_title}>
                                                            Phone:&nbsp;&nbsp;
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {application_info.phone}
                                                        </Typography>
                                                    </Box>
                                                    <Box className={classes.dialog_content}>
                                                        <Typography variant="body1" className={classes.dialog_content_title}>
                                                            Email:&nbsp;&nbsp;
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {application_info.email}
                                                        </Typography>
                                                    </Box>
                                                    <Box className={classes.dialog_content}>
                                                        <Typography variant="body1" className={classes.dialog_content_title}>
                                                            Address 1:&nbsp;&nbsp;
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {application_info.address1}
                                                        </Typography>
                                                    </Box>
                                                    <Box className={classes.dialog_content}>
                                                        <Typography variant="body1" className={classes.dialog_content_title}>
                                                            Address 2:&nbsp;&nbsp;
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {application_info.address2}
                                                        </Typography>
                                                    </Box>
                                                    <Box className={classes.dialog_content}>
                                                        <Typography variant="body1" className={classes.dialog_content_title}>
                                                            City, State:&nbsp;&nbsp;
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {application_info.city},&nbsp;{application_info.state}
                                                        </Typography>
                                                    </Box>
                                                    <Box className={classes.dialog_content}>
                                                        <Typography variant="body1" className={classes.dialog_content_title}>
                                                            ZIP:&nbsp;&nbsp;
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {application_info.zip}
                                                        </Typography>
                                                    </Box>
                                                    <Box className={classes.dialog_content}>
                                                        <Typography variant="body1" className={classes.dialog_content_title}>
                                                            Current Living Status:&nbsp;&nbsp;
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {application_info.currentLivingStatus}
                                                        </Typography>
                                                    </Box>
                                                    <Box className={classes.dialog_content}>
                                                        <Typography variant="body1" className={classes.dialog_content_title}>
                                                            Has Fully-fenced Yard:&nbsp;&nbsp;
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {application_info.fullyFencedYard ? 'Yes' : 'No'}
                                                        </Typography>
                                                    </Box>
                                                    <Box className={classes.dialog_content}>
                                                        <Typography variant="body1" className={classes.dialog_content_title}>
                                                            Area of Interest:&nbsp;&nbsp;
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {application_info.areaOfInterest}
                                                        </Typography>
                                                    </Box>
                                                    <Box className={classes.dialog_content}>
                                                        <Typography variant="body1" className={classes.dialog_content_title}>
                                                            Is Currently Having Dogs:&nbsp;&nbsp;
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {application_info.currentDog ? 'Yes' : 'No'}
                                                        </Typography>
                                                    </Box>
                                                    <Box className={classes.dialog_content}>
                                                        <Typography variant="body1" className={classes.dialog_content_title}>
                                                            Preferred Dog Gender:&nbsp;&nbsp;
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {application_info.preferredGender}
                                                        </Typography>
                                                    </Box>
                                                    <Box className={classes.dialog_content}>
                                                        <Typography variant="body1" className={classes.dialog_content_title}>
                                                            General Dog Preference:&nbsp;&nbsp;
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {application_info.generalPreference}
                                                        </Typography>
                                                    </Box>
                                                    <Box className={classes.dialog_content}>
                                                        <Typography variant="body1" className={classes.dialog_content_title}>
                                                            Is Preference Oriented:&nbsp;&nbsp;
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {application_info.preferenceOriented ? 'Yes' : 'No'}
                                                        </Typography>
                                                    </Box>
                                                    <Box className={classes.dialog_content}>
                                                        <Typography variant="body1" className={classes.dialog_content_title}>
                                                            Additional Info:&nbsp;&nbsp;
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {application_info.additionInformation}
                                                        </Typography>
                                                    </Box>
                                                    <Box className={classes.dialog_content}>
                                                        <Typography variant="body1" className={classes.dialog_content_title}>
                                                            Application Submit Date:&nbsp;&nbsp;
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            {created_date}
                                                        </Typography>
                                                    </Box>
                                                </DialogContentText>
                                            </DialogContent>
                                            {
                                                (accountType == 'breeder') ?
                                                    <DialogActions>
                                                        <Button onClick={this.handleApproveClicked} variant="outlined" color="primary">
                                                            Approve
                                                    </Button>
                                                        <Button onClick={this.handleDeclineClicked} color="primary">
                                                            Decline
                                                    </Button>
                                                        <Button onClick={this.handleViewDetailClose} color="black">
                                                            Close
                                                    </Button>
                                                    </DialogActions> :
                                                    <DialogActions>
                                                        <Button onClick={this.handleViewDetailClose} variant="outlined" color="primary">
                                                            Close
                                                    </Button>
                                                    </DialogActions>
                                            }
                                        </Dialog>
                                    </Grid>
                                    <Grid item>
                                        {
                                            (accountType == 'breeder') ? <Box ></Box> :
                                                <Button className={classes.withdrawl} variant="outlined" color="secondary" size='small' onClick={this.handleApplicationWithdrawal}>
                                                    Withdrawl
                                                </Button>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </div>
                </Card>
            </ListItem>
        );

    }
}

// export default withStyles(styles)(ApplicationCard);

ApplicationCard.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(ApplicationCard));