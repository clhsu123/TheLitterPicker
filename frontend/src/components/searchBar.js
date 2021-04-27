// import React from 'react';
// import TextField from '@material-ui/core/TextField';
// import IconButton from "@material-ui/core/IconButton";
// //import InputAdornment from "@material-ui/core/InputAdornment";
// import SearchIcon from "@material-ui/icons/Search";
// import Grid from '@material-ui/core/Grid';


// export class SearchBar extends React.Component {

//     constructor() {
//         super();
//         this.state = {};
//     }

//     // onChange() {
//     //     // console.log(this.searchText);    
//     // }

//     // onEnter() {
//     //     history.push("/home");
//     // }

//     // onSearchClick() {
//     //     // let path = this.searchText;
//     //     let path = '/search';
//     //     console.log(path);
//     //     history.push(path);
//     // }

//     render() {
//         // const { history } = useHistory();
//         return (
//             <Grid item container xs={12} direction='row' justify='center' alignItems='center'>
//                 <Grid item>
//                     <TextField label='Search'></TextField>
//                 </Grid>
//                 <Grid item>
//                     <IconButton>
//                         <SearchIcon />
//                     </IconButton>
//                 </Grid>
//             </Grid>

//         );
//     }

// }

// export default SearchBar;

import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    // form: {
    //     textAlign: 'center'
    // },
    // image: {
    //     margin: '20px auto 20px auto'
    // },
    // pagetitle: {
    //     margin: '10px auto 10px auto'
    // },
    // textField: {
    //     margin: '10px auto 10px auto'
    // },
    // button: {
    //     marginTop: 20,
    //     position: 'relative'
    // },
    // customError: {
    //     color: 'red',
    //     fontSize: '0.8rem',
    //     marginTop: 10
    // },
    // progress: {
    //     position: 'absolute'
    // }
};

export class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userEnteredInput: "",
        };
    }

    handleChange = (e) => {
        this.setState({
            userEnteredInput: e.target.value
        });
    }

    handleClickSearchButton = (e) => {
        // console.log(this.userEnteredInput);
        // this.state.history.push("/search");
        // this.props.useHistory.push
    }


    render() {
        // const { history } = useHistory();
        return (
            <Grid item container xs={12} direction='row' justify='center' alignItems='center'>
                <Grid item>
                    <FormControl variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-searchbar"
                            type='text'
                            placeholder='chihuahua, bulldog'
                            value={this.state.userEnteredInput}
                            onChange={this.handleChange}
                            startAdornment={<InputAdornment position="start">Search</InputAdornment>}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="search icon button"
                                        onClick={this.handleClickSearchButton}
                                        edge="end"
                                    >
                                        <SearchIcon />
                                        {/* {values.showPassword ? <SearchIcon /> : <SearchIcon />} */}
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

export default withStyles(styles)(SearchBar);