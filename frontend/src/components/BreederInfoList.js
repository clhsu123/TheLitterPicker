import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import BreederInfoCard from '../components/BreederInfoCard';

const styles = {
    root: {
        margin: '0px 0px 0px 0px',
    },
};

export class BreederInfoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { classes } = this.props;
        const breeders = this.props.breeders;
        const breedersInfoItems = breeders.map((breeder) => 
            <BreederInfoCard key={breeder.handle.toString()} info={breeder}></BreederInfoCard>
        );
        return (
            <List >
                {breedersInfoItems}
            </List>
        );
    }
}

export default withStyles(styles)(BreederInfoList);

