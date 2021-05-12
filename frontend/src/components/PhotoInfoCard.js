import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
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

export class PhotoInfoCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }



    render() {
        const { classes } = this.props;
        const dog_info = this.props.info;
        return (
            <Grid container xs={12} direction="column" alignItems="center">
                <Grid item>
                    <img src={dog_info.images[0]} width='480' height='320' />
                </Grid>
                <Grid item>
                    <Typography variant="h5" component="h5" >
                        <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                            {dog_info.name}
                        </Box>
                    </Typography>
                </Grid>
            </Grid>

        );

    }
}

export default withStyles(styles)(PhotoInfoCard);