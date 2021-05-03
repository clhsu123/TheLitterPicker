import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BreederInfoList from '../components/BreederInfoList';

const styles = {
    root: {
        margin: '0px 0px 0px 0px',
        // textAlign: 'center',
    },
    subtitle: {
        margin: '20px 10px 10px 10px',
    }
};

export class search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: this.props.history.location.state?.keyword,
            breeders: [],
        };
    }

    componentDidMount() {
        // testing
        var b1 = {
            dog_breed_type: 'collie', title: 'Crosswood Border Collies', registration_email: 'mariam@gmail.com',
            username: 'mariamartinez', password: 'abcd1234', profile_photo: 'https://firebasestorage.googleapis.com/v0/b/pickerpicker-3e855.appspot.com/o/no-img.png?alt=media&token=782cdd95-8d4d-434b-8e2a-f57d7dace598', background_photo: 'https://cdn4.vectorstock.com/i/1000x1000/52/48/background-with-dog-paw-print-and-bone-vector-25885248.jpg', phone: '949-111-2222', contact_email: 'mariam@gmail.com', address: 'Irvine, CA', overview: 'Coming from only the purest and finest of bloodlines, we have carefully selected which dogs we breed. We are intentional ...', applications: [],
            tags: [],
        }

        var b2 = {
            dog_breed_type: 'collie', title: 'SnoValley Collies', registration_email: 'jsonw77@gmail.com',
            username: 'jasonwhite', password: 'json1234', profile_photo: 'https://firebasestorage.googleapis.com/v0/b/pickerpicker-3e855.appspot.com/o/no-img.png?alt=media&token=782cdd95-8d4d-434b-8e2a-f57d7dace598', background_photo: 'https://cdn4.vectorstock.com/i/1000x1000/52/48/background-with-dog-paw-print-and-bone-vector-25885248.jpg', phone: '949-222-4444', contact_email: 'jsonw77@gmail.com', address: 'San Diego, CA', overview: 'Our pups are well socialized, being raised with our children and strangers, exposed to livestock, cats, and other dogs ...', applications: [],
            tags: []
        }

        var b3 = {
            dog_breed_type: 'collie', title: 'Border Collies', registration_email: 'karenmourx@gmail.com',
            username: 'karenmourx', password: 'kk8899_', profile_photo: 'https://firebasestorage.googleapis.com/v0/b/pickerpicker-3e855.appspot.com/o/no-img.png?alt=media&token=782cdd95-8d4d-434b-8e2a-f57d7dace598', background_photo: 'https://cdn4.vectorstock.com/i/1000x1000/52/48/background-with-dog-paw-print-and-bone-vector-25885248.jpg', phone: '818-527-8221', contact_email: 'karenmourx@gmail.com', address: 'Fillmore, CA', overview: 'Karen Moureaux is from California and breeds Border Collies. AKC proudly supports dedicated and responsible breeders. We encourage all prospective puppy owners to do their research and be prepared with questions to ask the breeder. Make sure you are not only choosing the right breed for you, but also that you’re getting it from the right individual.', applications: [], tags: []
        }

        var b4 = {
            dog_breed_type: 'collie', title: 'Bearded Collie', registration_email: 'debeknightly@gmail.com',
            username: 'debeknightly', password: 'debe_knightly_5577', profile_photo: 'https://firebasestorage.googleapis.com/v0/b/pickerpicker-3e855.appspot.com/o/no-img.png?alt=media&token=782cdd95-8d4d-434b-8e2a-f57d7dace598', background_photo: 'https://cdn4.vectorstock.com/i/1000x1000/52/48/background-with-dog-paw-print-and-bone-vector-25885248.jpg', phone: '785-258-2539', contact_email: 'debeknightly@gmail.com', address: 'Herington, KS', overview: 'Professional Dog & Cat Groomer for 40 years; grooming shop located at my home. Kansas State Licensed Retail Breeder of Airedale Terriers, Bearded Collies, Standard Poodles, Golden Retrievers. Coming in LATE 2021, new additional breeds: Miniature & Toy Poodles, Irish Setter, Afghan Hound.', applications: [], tags: []
        }


        const breedersinfo = [b1, b2, b3, b4];
        this.setState({ breeders: breedersinfo });

        /* get requested breeders info from database */
        // axios
        //     .get('/PuppyBreeders')
        //     .then(res =>{
        //         console.log(res.data)
        //         this.setState({
        //             breeders: breedersinfo
        //         });
        //     })
        //     .catch(err => console.log(err));
    }

    render() {
        const { classes } = this.props;
        const keyword = this.state.keyword;
        return (
            <Grid container spacing={3} className={classes.root}>
                <Grid item xs={12} className={classes.subtitle}>
                    <Typography variant="h4" component="h4" >
                        <Box fontFamily="Jazz LET, fantasy" fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055" xs={1}>
                            Results of "{keyword}" Breeders
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <BreederInfoList breeders={this.state.breeders} />
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(search);