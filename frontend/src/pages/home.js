import React from 'react';
import AppIcon from '../images/dog_lover.png';
import SearchBar from '../components/searchBar';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

const styles = {
    root: {
        margin: '0px 0px 0px 0px',
        textAlign: 'center',
    },
    grid_container: {
        justify: 'center',
    }
};

export class home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={3} className={classes.root}>
                <Grid item xs={12}>
                    <h1>TheLitterPicker.com</h1>
                </Grid>
                <Grid item xs={12}>
                    <img src={AppIcon} alt="dog_lover" width="300" height="300" />
                </Grid>
                <Grid item xs={12}>
                    <SearchBar />
                </Grid>
            </Grid>
        );
    }
}

home.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(home);

