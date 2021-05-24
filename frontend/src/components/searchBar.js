import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";

const styles = {
    searchbar: {
        textAlign: 'center',
    },
};

export class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            keyword: e.target.value
        });
    }

    handleClickSearchButton = (e) => {
        // console.log("clicked");
        // console.log(this.state.keyword);
        this.props.history.push('/search', { keyword: this.state.keyword });
    }
    
    handleKeyPress = (e) => {
        if (e.keyCode == 13) {
            this.props.history.push('/search', { keyword: this.state.keyword });
        }
    }


    render() {
        const { classes } = this.props;
        return (
            <Grid item container xs={12} direction='row' justify='center' alignItems='center'>
                <Grid item className>
                    <FormControl variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-searchbar"
                            type='text'
                            placeholder=''
                            value={this.state.keyword}
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyPress}
                            startAdornment={<InputAdornment position="start">Search</InputAdornment>}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="search icon button"
                                        onClick={this.handleClickSearchButton}
                                        edge="end"
                                    >
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Grid>
            </Grid>

        );
    }

}

export default withRouter(withStyles(styles)(SearchBar));