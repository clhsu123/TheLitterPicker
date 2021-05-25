import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import PhotoInfoCard from "./PhotoInfoCard";


const styles = theme =>({
    root: {
        margin: '0px 0px 0px 0px',
    },
});

export class PhotoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        const { classes, theme } = this.props;
        const dogs = this.props.dogs_list;
        const dogsInfoItems = dogs.map((dog) =>
            // <img src={dog.images[0]} width='480' height='320' />
            <PhotoInfoCard info={dog}></PhotoInfoCard>
        );
        return (
            <List >
                {dogsInfoItems}
            </List>
        );
    }
}

export default withStyles(styles, { withTheme: true })(PhotoList);

