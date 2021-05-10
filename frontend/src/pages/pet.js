import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const styles = {

};

export class pet extends Component {
    render() {
        const { classes } = this.props; 
        return (
            <Grid container>
                <Grid container item xs = {12}>
                    <Grid container item xs = {8}>
                        <Grid item xs = {2}>
                            <img src = "https://firebasestorage.googleapis.com/v0/b/pickerpicker-3e855.appspot.com/o/no-img.png?alt=media" width="80" height="80"/>
                        </Grid>
                        <Grid item xs = {6}>
                            <h2>Pet Owner Amber</h2>
                        </Grid>
                    </Grid>
                    <Grid container item xs = {4}>
                            <Button variant="contained" color="primary">
                                Upadate Profile
                            </Button>
                    </Grid>
                </Grid>

                <Grid item xs = {12}>
                    <h2>Summary</h2>
                </Grid>
                
                <Grid item xs = {12}>
                    <Box display="flex" justifyContent="center" border = {1} borderRadius = {15}>
                        <p>You love (groan) dad jokes and you actually live mom jokes, but kids are natural comedians! Why not encourage them to get punny with these kid-approved quips that require little to no explanation from parents? Whether it’s a joke a day for the kids, lunchbox jokes for every day or clean jokes to tell to kids, don’t be surprised when the comedy sketch goes beyond today! Scroll down for silly jokes and corny jokes, many of which have been sent to us by kid-readers (like you!).</p>
                    </Box>
                </Grid>
                
                <Grid item xs = {12}>
                    <h2>My Applications</h2>
                </Grid>
                
                <Grid container item xs = {12}>
                    <Grid container item xs = {8}>
                        <Grid item xs = {8}>
                            <p>Breeder: Amber</p>
                        </Grid>
                        <Grid item xs = {8}>
                            <p>Apply Date: 2021/04/27</p>
                        </Grid>
                        <Grid item xs = {8}>
                            <p>Sttus: Pending</p>
                        </Grid>
                    </Grid>
                    <Grid container item xs = {4}>
                        <Grid item sm = {12}>
                            <Button variant="contained" color="primary">
                                View Detail
                            </Button>
                        </Grid>
                        <Grid item sm = {12}>
                            <Button variant="contained" color="primary">
                                Withdraw
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

pet.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(pet)
