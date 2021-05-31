import React from 'react';
import SearchBar from '../components/searchBar';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import PetsIcon from '@material-ui/icons/Pets';
import PropTypes from 'prop-types';

const styles = {
    root: {
        margin: '0px 0px 0px 0px',
        textAlign: 'center',
    },
    title: {
        margin: '50px 50px 10px 50px',
        textAlign: 'center',
    },
    subtitle: {
        margin: '10px 50px 20px 50px',
        textAlign: 'center',
    },
    chips_row: {
        margin: '5px 8px 5px 8px',
        // flexGrow: 1,
    },
    chip: {
        margin: '0px 8px 0px 8px',
        // flexGrow: 1,
    },
    grid_container: {
        justify: 'center',
    }
};

export class NewHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (user_entered_keyword) {
        this.props.history.push('/search', {keyword: user_entered_keyword});
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={3} className={classes.root}>

                <Grid item xs={12} className={classes.title}>
                    <Typography variant="h1" component="h1">
                        <Box fontStyle="oblique" fontWeight="fontWeightBold" letterSpacing={8} xs={1}>
                            TheLitterPicker.com
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={12} className={classes.subtitle}>
                    <Typography variant="h4" component="h4" >
                        <Box fontStyle="oblique" fontWeight="fontWeightMedium" letterSpacing={3} color="#000000" xs={1}>
                            Find your ideal puppies by dog breeds
                        </Box>
                    </Typography>
                </Grid>
                {/* <Grid item xs={12}>
                    <img src={AppIcon} alt="dog_lover" width="300" height="300" />
                </Grid> */}
                <Grid item xs={12}>
                    <SearchBar />
                </Grid>
                <Grid item xs={12} className={classes.chips_row}>
                    <Chip className={classes.chip}
                        icon={<PetsIcon />}
                        label="Collie"
                        clickable
                        color="secondary"
                        onClick={() => this.handleClick("collie")}
                    />
                    <Chip className={classes.chip}
                        icon={<PetsIcon />}
                        label="Chihuahua"
                        clickable
                        color="primary"
                        onClick={() => this.handleClick("chihuahua")}
                    />
                    <Chip className={classes.chip}
                        icon={<PetsIcon />}
                        label="Bulldog"
                        clickable
                        color="secondary"
                        onClick={() => this.handleClick("bulldog")}
                    />
                </Grid>

                <Grid item xs={12} className={classes.chips_row}>
                    <Chip className={classes.chip}
                        icon={<PetsIcon />}
                        label="Shiba"
                        clickable
                        color="secondary"
                        onClick={() => this.handleClick("shiba")}
                    />
                    <Chip className={classes.chip}
                        icon={<PetsIcon />}
                        label="Samoyed"
                        clickable
                        color="primary"
                        onClick={() => this.handleClick("samoyed")}
                    />
                </Grid>
                
            </Grid>
        );
    }
}

NewHome.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(NewHome));