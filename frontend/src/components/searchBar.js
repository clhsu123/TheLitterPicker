import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
//import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Grid from '@material-ui/core/Grid';


export class SearchBar extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    // onChange() {
    //     // console.log(this.searchText);    
    // }

    // onEnter() {
    //     history.push("/home");
    // }

    // onSearchClick() {
    //     // let path = this.searchText;
    //     let path = '/search';
    //     console.log(path);
    //     history.push(path);
    // }

    render() {
        // const { history } = useHistory();
        return (
            <Grid item container xs={12} direction='row' justify='center' alignItems='center'>
                <Grid item>
                    <TextField label='Search'></TextField>
                </Grid>
                <Grid item>
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </Grid>
            </Grid>

        );
    }

}

export default SearchBar;