import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import { withRouter } from "react-router";

const styles = {
    root: {
        margin: '0px 0px 0px 0px',
        display: 'flex'
        // textAlign: 'center',
    },
    avatar: {
        margin: '10px 10px 10px 10px',
        display: 'flex',
        width: 240,
        height: 200,
    },
    card_content: {
        display: 'flex',
        // justify: 'center',
        width: 980,
    },

    tags: {
        textDecoration: 'underline',
    }
};

export class BreederInfoCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            readMore: false,
        };
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleReadMoreClick = this.handleReadMoreClick.bind(this);
    }

    handleOnClick() {
        this.props.history.push('/breeder_profile', {breeder_info: this.props.info});
    }

    handleReadMoreClick() {
        this.setState({
            readMore: !this.state.readMore
        });
    }

    render() {
        const { classes } = this.props;
        const breeder_info = this.props.info;
        return (
            <ListItem alignItems="flex-start">
                <Card className={classes.root}>
                    <CardMedia
                        onClick={this.handleOnClick}
                        className={classes.avatar}
                        title="Breeder Image"
                        image={breeder_info.profile_photo}
                    />
                    <div className={classes.card_content}>
                        <CardContent>
                            <Typography component="h5" variant="h5">
                                {breeder_info.title}
                            </Typography>

                            <Grid container direction='row'>
                                <Grid item xs={3}>
                                    <Typography variant="body1" color="textSecondary" className={classes.tags}>
                                        {breeder_info.address}
                                    </Typography>
                                </Grid>

                                <Grid item xs={3}>
                                    <Typography variant="body1" color="textSecondary" className={classes.tags}>
                                        {breeder_info.phone}
                                    </Typography>
                                </Grid>

                                <Grid item xs={3}>
                                    <Typography variant="body1" color="textSecondary" className={classes.tags}>
                                        {breeder_info.contact_email}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Typography variant="h6" color="h6">
                                {breeder_info.overview}
                            </Typography>
                        </CardContent>
                    </div>
                </Card>
            </ListItem>
        );

    }
}

export default withRouter(withStyles(styles)(BreederInfoCard));