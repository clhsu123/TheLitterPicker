import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ApplicationCard from '../components/ApplicationCard';

const styles = {
    root: {
        margin: '0px 0px 0px 0px',
    },
};

export class ApplicationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_applications: [],
        };
    }
    
    componentDidMount() {
        // testing
        // const application_ids = this.props.application_ids;
        const application_ids = ['aHsrSjZiNVqOituvfZBW', 'caOfscXFQHT9iQzEcX8I', 'dCebRRD10WKdrWRxmtwN'];
        console.log(application_ids);
        var a1 = {
            notification: 'Please note the cost of a puppy is $2,300. We truly care about our puppies and their future well being. This is why we require any potential puppy owner to fill out this form. Once your application is completed and submitted, we will review it and give you an answer within 24-48 hours.', firstname: 'marcy', lastname: 'tucker', email: 'yjw123444@gmail.com', phone: '852-963-6564',
            address1: '230 walnut street', address2: '', city: 'Irvine', state: 'CA', zip: '92622',
            currentLivingstatus: 'House', fullyFencedYards: true, areaOfInterest: 'Shiba puppies', currentDogs: false,
            preferredGender: 1, generalPreference: 'Female Puppies', preferenceOriented: true, status: 0,
            additionalInformation: '', createdAt: new Date("May 8, 2021"),
        }
        
        
        var a2 = {
            notification: 'PUPPY PACK $250.00. Brand new starter cage, starter cage mat, blanket, treats, toys, training mats, a bag of puppies food, collar, engraved name tag, leash, water & food bowl.', firstname: 'marcy', lastname: 'tucker', email: 'erich1995@gmail.com', phone: '588-151-7532',
            address1: '5419 oberlin drive', address2: '', city: 'San Diego', state: 'CA', zip: '92121',
            currentLivingstatus: 'Townhouse', fullyFencedYards: true, areaOfInterest: 'Chihuahua puppies', currentDogs: false,
            preferredGender: 1, generalPreference: 'Female Puppies', preferenceOriented: false, status: 2,
            additionalInformation: '', createdAt: new Date("May 1, 2021"),
        }
        
        var a3 = {
            notification: 'The puppies in this litter are from AKC Registered parents and can also be registered with the AKC. 2 black & tan males, 1 black & tan female, 1 red sesame female available. Black & tan puppies are $2200, red sesame is $2500. $500 NON-REFUNDABLE deposit to hold. Ready after June 28th. Both parents are family pets and on premises.', firstname: 'marcy', lastname: 'tucker', email: 'wilwhite919@gmail.com', phone: '663-121-8523',
            address1: 'claretta ave', address2: '', city: 'Cerritos', state: 'CA', zip: '90703',
            currentLivingstatus: 'House', fullyFencedYards: true, areaOfInterest: 'Shiba puppies', currentDogs: false,
            preferredGender: 0, generalPreference: 'Male Puppies', preferenceOriented: true, status: 1,
            additionalInformation: '', createdAt: new Date("February 21, 2021"),
        }
        
        const applications_data = [a1, a2, a3];
        const user_applications = applications_data;
        this.setState({ user_applications: user_applications });
        
        /* get the applications that the current user has applied to from our database with application_ids (an array storing a list of document.id) */
        // const application_ids = this.props.application_ids;
        // axios
        //     .post('/get_breeder_by_breed_type', application_ids)
        //     .then(res =>{
        //         this.setState({
        //             user_applications : res.data
        //         });
        //     })
        //     .catch(err => console.log(err));
    }

    render() {
        const { classes } = this.props;
        const applications = this.state.user_applications;
        const applicationInfoItems = applications.map((application) =>
            <ApplicationCard info={application}></ApplicationCard>
        );
        return (
            <List >
                {applicationInfoItems}
            </List>
        );
    }
}

export default withStyles(styles)(ApplicationList);

