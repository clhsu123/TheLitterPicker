import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import { InputBase } from '@material-ui/core';
import ApplicationList from '../components/ApplicationList';

// Redux stuff
import { connect } from 'react-redux';

const styles = {
    root: {
        margin: '10px 10px 10px 10px',
        padding: '20px 10px 10px 10px',
        // textAlign: 'center',
    },
    subtitle: {
        margin: '10px 10px 10px 10px',
    },
    title_text: {
        fontWeight: 'bold',

    },
    icon: {
        margin: '2px 2px 2px 2px',
    },
    overview: {
        padding: '15px 15px 15px 15px',
    },
    button: {
        margin: '10px 10px 10px 10px',
        // padding: '10px 10px 10px 10px',
    }
};

export class ViewApplications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    render() {
        const { classes, user } = this.props;
        return (
            <Grid container spacing={3} className={classes.root}>
                <Grid container item xs={12} direction='row' alignItems="baseline" justify="flex-start">
                    <Grid item xs={2}>
                        <Button>
                            <img src={user.profile_photo} width='100' height='100' />
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h4" component="h4" >
                            <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={2} color="#000055">
                                {user.title}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <InputBase
                            id="breeder phone"
                            type='text'
                            value={user.phone}
                            startAdornment={
                                <InputAdornment position="start">
                                    <PhoneIphoneIcon />
                                </InputAdornment>
                            }
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <InputBase
                            id="breeder email"
                            type='email'
                            value={user.contact_email}
                            startAdornment={
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            }
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={8} direction="column">
                    <Grid item className={classes.subtitle}>
                        <Typography variant="h5" component="h5" >
                            <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                                Past Applicatoins
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item>
                        {/* <Paper variant="outlined" className={classes.overview}>
                            {breeder_info.overview}
                        </Paper> */}
                        <ApplicationList application_ids={user.application_list} />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

ViewApplications.propTypes = {
    user: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
    user: state.user,
})
export default connect(mapStateToProps)(withStyles(styles)(ViewApplications));