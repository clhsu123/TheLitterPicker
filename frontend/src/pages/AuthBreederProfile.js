import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import { InputBase } from '@material-ui/core';
import { PhotoList } from '../components/PhotoList';
import axios from 'axios';

// redux stuff
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

export class AuthBreederProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breeder_info: {},
            dogs_info: [],
            boys_info: [],
            girls_info: [],
            puppies_info: [],
        };
        this.classifyDogInfo = this.classifyDogInfo.bind(this);
        this.handleViewApplicationsClicked = this.handleViewApplicationsClicked.bind(this);
    }

    handleViewApplicationsClicked() {
        this.props.history.push('/view_applicatoins', { breeder_info: this.state.breeder_info });
    }

    classifyDogInfo = (dogs_data) => {
        // var dogs = this.state.dogs_info;
        var dogs = dogs_data;
        var boys = [];
        var girls = [];
        var puppies = [];
        var i, d;

        for (var i = 0; i < dogs.length; i++) {
            d = dogs[i];
            if (d.isPuppy === true) {
                puppies.push(d);
            } else if (d.gender === "female") {
                girls.push(d);
            } else {
                boys.push(d);
            }
        }
        this.setState({
            boys_info: boys,
            girls_info: girls,
            puppies_info: puppies,
        });
    }

    componentDidMount() {
        const { classes, user: {
            handle,
            profile_photo,
        }
        } = this.props;
        // get breeder info from our database
        axios
            .post('/get_breeder_details_by_handle', handle)
            .then(res => {
                this.setState({
                    breeder_info: res.data
                });
            })
            .catch(err => console.log(err));

        // testing
        // assume we get Dogs sub-collections data from the database
        var d1 = {
            name: 'eva', gender: 'female',
            birthdate: '12-31-2020', isPuppy: true, description: 'The Border Collie is the star of the herding group. He is a hard worker, with keen instincts and intelligence. Your Border Collie puppy will thrive on lots of exercise and a job to do, even if that job is catching a Frisbee or running an agility course. To see him at work or play is a thing of beauty; he is graceful, agile and responsive. He is affectionate with his family and always ready for the next activity.', images: ['https://cdn11.bigcommerce.com/s-oe2q4reh/images/stencil/2048x2048/products/747/1315/Border_Collie_Puppy__65459.1572977599.jpg?c=2', 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12235957/Border-Collie-On-White-01.jpg'], videos: ['', '']
        }

        var d2 = {
            name: 'mimi', gender: 'male',
            birthdate: '12-10-2020', isPuppy: false, description: 'Border Collies are generally a healthy and robust breed. Like all breeds there may be some health issues. Some dogs may be faced with these health challenges in their lives, but the majority of Border Collies are healthy dogs.', images: ['https://www.keystonepuppies.com/wp-content/uploads/2018/09/Border-Collie-Category.jpg', 'https://i.redd.it/xtfk2xpka44z.jpg'], videos: ['', '']
        }

        var d3 = {
            name: 'kiki', gender: 'female',
            birthdate: '06-01-2020', isPuppy: false, description: 'he gets along with other animals and children and excels at dog sports, like agility, obedience and rally. The key to a happy bearded collie is exercise, mental stimulation, training and socialization. With that, he will be a great partner for an active, outdoorsy family.', images: ['https://i.pinimg.com/originals/e0/d2/2b/e0d22ba47d80c01e4e528fd76770d787.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbXGzV3BtDFjmLY96WKbIrVthftrbr7AeN4x08Wj3PwxVEp1ogq9X3tkApEUfafUOHd3s&usqp=CAU'], videos: ['', '']
        }
        const dogs_data = [d1, d2, d3];
        this.setState({ dogs_info: dogs_data });
        this.classifyDogInfo(dogs_data);
    }

    render() {
        const { classes, user: {
            handle,
            profile_photo,
            authenticated,
            accountType
        }
        } = this.props;
        const breeder_info = this.state.breeder_info;
        return (
            <Grid container spacing={3} className={classes.root}>
                <Grid container item xs={12} direction='row' alignItems="baseline" justify="flex-start">
                    <Grid item xs={2}>
                        <Button>
                            <img src={breeder_info.profile_photo} width='100' height='100' />
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h4" component="h4" >
                            <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={2} color="#000055">
                                {breeder_info.title}
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <InputBase
                            id="breeder phone"
                            type='text'
                            value={breeder_info.phone}
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
                            value={breeder_info.contact_email}
                            startAdornment={
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            }
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={12} direction='row' alignItems="baseline">
                    <Grid container item xs={8} direction="column">
                        <Grid item className={classes.subtitle}>
                            <Typography variant="h5" component="h5" >
                                <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                                    Overview
                                </Box>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Paper variant="outlined" className={classes.overview}>
                                {breeder_info.overview}
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container item xs={4} direction="column" alignItems="center">
                        <Grid item xs={5} className={classes.button}>
                            {/* <Button variant="contained" color="secondary" component={Link} to="/view_applicatoins">
                                View Applications
                            </Button> */}
                            <Button variant="contained" color="secondary" onClick={this.handleViewApplicationsClicked}>
                                View Applications
                            </Button>

                        </Grid>
                        <Grid item xs={5} className={classes.button}>
                            <Button variant="contained" color="secondary" component={Link} to="/customize_application_form">
                                Customize Application Form
                            </Button>
                        </Grid>
                        {/* <Grid item xs={5} className={classes.button}>
                            <Button variant="contained" color="secondary" component={Link} to="/application">
                                Apply Applications
                            </Button>
                        </Grid> */}
                    </Grid>
                </Grid>
                <Grid item className={classes.subtitle}>
                    <Typography variant="h5" component="h5" >
                        <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                            Boys / Sires
                        </Box>
                    </Typography>
                </Grid>
                <Grid container item direction="row">
                    <PhotoList dogs_list={this.state.boys_info} />
                </Grid>
                <Grid item xs={12} className={classes.subtitle}>
                    <Typography variant="h5" component="h5" >
                        <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                            Girls / Dams
                        </Box>
                    </Typography>
                </Grid>
                <Grid container item direction="row">
                    <PhotoList dogs_list={this.state.girls_info} />
                </Grid>
                <Grid item xs={12} className={classes.subtitle}>
                    <Typography variant="h5" component="h5" >
                        <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055">
                            Available Puppies
                        </Box>
                    </Typography>
                </Grid>
                <Grid container item direction="row">
                    <PhotoList dogs_list={this.state.puppies_info} />
                </Grid>
            </Grid>
        );
    }
}

AuthBreederProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(AuthBreederProfile));