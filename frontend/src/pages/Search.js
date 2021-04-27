import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from "@material-ui/core/List";
import BreederInfoCard from '../components/BreederInfoCard';

const styles = {
    root: {
        margin: '0px 0px 0px 0px',
        // textAlign: 'center',
    },
    // grid_container: {
    //     justify: 'center',
    // }
};

export class search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={3} className={classes.root}>
                <Grid item xs={12}>
                    <h1>Results of "Collie" Breeders</h1>
                </Grid>
                <Grid item xs={12}>
                    <List>
                        <BreederInfoCard/>
                        <BreederInfoCard/>
                    </List>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(search);

