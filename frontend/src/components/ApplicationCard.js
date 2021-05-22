import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = {
    root: {
        margin: '5px 5px 5px 5px',
        display: 'flex'
    },
    card_content: {
        width: 2400,
    },
    tags: {
        // textDecoration: 'underline',
    },
    viewdetails: {
        margin: '5px 5px 5px 5px',
    },
    withdrawl: {
        margin: '5px 5px 5px 5px',
    }
};

export class ApplicationCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            application_status: '',
        };
    }

    componentDidMount() {
        console.log(this.props.info);
        /*
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
        */
    }



    render() {
        const { classes } = this.props;
        const application_info = this.props.info;
        var d = application_info.createdAt;
        //var month = '' + (d.getMonth() + 1);
        //var day = '' + d.getDate();
        //var year = d.getFullYear();
        //const created_date =[year, month, day].join('-');
        const created_date = d;
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
                                                {application_info.areaOfInterest}
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
                                        <Button className={classes.viewdetails} variant="contained" color="secondary" size='small' component={Link} to="/viewdetails">
                                            View Detail
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button className={classes.withdrawl} variant="outlined" color="secondary" size='small' component={Link} to="/withdrawl">
                                            Withdrawl
                                        </Button>
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

export default withStyles(styles)(ApplicationCard);