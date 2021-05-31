import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ApplicationCard from './ApplicationCard';
const styles = {
    root: {
        margin: '0px 0px 0px 0px',
    },
};

export class ApplicationList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_applications: this.props.application_ids
        };
    }
    
    render() {  
        const { classes } = this.props;
        const applications = this.state.user_applications;
        const applicationInfoItems = applications.map((application, i) => (
            <ApplicationCard key = {i.toString()} info={application}></ApplicationCard>
        ));
        
        return ( 
            <List>
                {applicationInfoItems}
            </List>
        );

    }
}

export default withStyles(styles)(ApplicationList);

