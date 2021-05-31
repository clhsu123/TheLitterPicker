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
            breeders: []
        };
    }

    componentDidMount() {
        const search_info = { 
            dog_breed_type: this.state.keyword 
        }
        axios
            .post('/get_breeder_by_breed_type', search_info)
            .then(res =>{
                this.setState({
                    breeders : res.data
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        const { classes } = this.props;
        const keyword = this.state.keyword;
        return (
            <Grid container spacing={3} className={classes.root}>
                <Grid item xs={12} className={classes.subtitle}>
                    <Typography variant="h4" component="h4" >
                        <Box fontStyle="normal" fontWeight="fontWeightMedium" letterSpacing={4} color="#000055" xs={1}>
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