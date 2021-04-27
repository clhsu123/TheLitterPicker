import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from "@material-ui/core/List";
import BreederInfoCard from '../components/BreederInfoCard';
import BreederInfoList from '../components/BreederInfoList';

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
        this.state = {
            breeders: [],
        };
    }

    componentDidMount() {
        // testing
        var b1 = {
            registration_email: "mariam@gmail.com",
            password: "abcd1234",
            username: "mariamartinez",
            profile_photo: "https://homepages.cae.wisc.edu/~ece533/images/cat.png",
            background_photo: "https://lh3.googleusercontent.com/proxy/hU04Arw4S9yH4Qqf3I4tumB9LFseByb73QXsfgei5XAHfVwgLgjiYXuQaDORNJFtUMYDCWooJN28muNlmqBt4WMJVp9dvzrYHadaL8ZqGISzmU7e_p1TuWMksqFu4YgCUscITptWBeoaQQFJBp0jbw4dgmImBENHl1vI_wwZ9XO85Q", 
            phone: "9491112222", 
            contact_email: "mariam@gmail.com", 
            address: "Irvine, CA", 
            overview: "Coming from only the purest and finest of bloodlines, we have carefully selected which dogs we breed. We are intentional ...", 
            Post: [], 
            questions: [], //(customized questions used for application), 
            Application: [], 
            dog_breed_type: "SnoValley Collies"
        }
        var b2 = {
            registration_email: "jsonw77@gmail.com",
            password: "abcd1234",
            username: "jasonwhite",
            profile_photo: "https://homepages.cae.wisc.edu/~ece533/images/cat.png",
            background_photo: "https://vetstreet.brightspotcdn.com/dims4/default/5b718e8/2147483647/crop/0x0%2B0%2B0/resize/645x380/quality/90/?url=https%3A%2F%2Fvetstreet-brightspot.s3.amazonaws.com%2F3a%2Fd123309ea211e0a2380050568d634f%2Ffile%2Fcollie-5-645062411.jpg", 
            phone: "9492224444", 
            contact_email: "gmail", 
            address: "San Diego, CA", 
            overview: "Our pups are well socialized, being raised with our children and strangers, exposed to livestock, cats, and other dogs ...", 
            Post: [], 
            questions: [], //(customized questions used for application), 
            Application: [], 
            dog_breed_type: "Crosswood Border Collies"
        }
        var b3 = {
            registration_email: "johnsnowing@gmail.com",
            password: "abcd1234",
            username: " johnsnow",
            profile_photo: "https://homepages.cae.wisc.edu/~ece533/images/cat.png",
            background_photo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Chihuahua1_bvdb.jpg", 
            phone: "8684445555", 
            contact_email: "johnsnowing@gmail.com", 
            address: "Los Angeles, CA", 
            overview: "Coming from only the purest and finest of bloodlines, we have carefully selected which dogs we breed. We are intentional ...", 
            Post: [], 
            questions: [], //(customized questions used for application), 
            Application: [], 
            dog_breed_type: "Chihuahua"
        }
        var b4 = {
            registration_email: "nick8888@gmail.com",
            password: "abcd1234",
            username: "nickyng",
            profile_photo: "https://homepages.cae.wisc.edu/~ece533/images/cat.png",
            background_photo: "https://i.pinimg.com/736x/42/4a/90/424a904e5488c1af121c3bba6c71555a.jpg", 
            phone: "9493336253", 
            contact_email: "nick8888@gmail.com", 
            address: "Irvine, CA", 
            overview: "Coming from only the purest and finest of bloodlines, we have carefully selected which dogs we breed. We are intentional ...", 
            Post: [], 
            questions: [], //(customized questions used for application), 
            Application: [], 
            dog_breed_type: "Samoyed",
        }
        const breedersinfo = [b1, b2,] // b3, b4];
        this.setState({ breeders: breedersinfo });
        // get requested breeders info from database

        // axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=*apikeyhere*&language=en-US&page=1`)
        //     .then(res => {
        //         const breedersinfo = res.data.results.map(obj => [obj.title, obj.overview]);
        //         this.setState({breeders: breedersinfo});
        //     });
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container spacing={3} className={classes.root}>
                <Grid item xs={12}>
                    <h1>Results of "Collie" Breeders</h1>
                </Grid>
                <Grid item xs={12}>
                    <BreederInfoList breeders={this.state.breeders} />
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(search);

