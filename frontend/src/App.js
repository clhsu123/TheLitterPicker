import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getBreederData } from './redux/actions/userActions';
//Components
// import Navbar from './components/new_Navbar';
import Navbar from './components/Navbar';
import AuthRoute from './util/AuthRoute';
//Pages
//import home_firebase from './pages/home_firebase';
import login from './pages/login';
import signup from './pages/signup';
import profile from './pages/AuthProfile';
import search from './pages/Search';
import pet from './pages/pet';
import PetOwner from './pages/PetOwner';
import NewHome from './pages/newHome';
import axios from 'axios';
import application from './pages/application'

const theme = createMuiTheme({
  palette: {
    // primary: {
    //   light: '#757ce8',
    //   main: '#3f50b5',
    //   dark: '#002884',
    //   contrastText: '#fff',
    // },
    // secondary: {
    //   light: '#ff7961',
    //   main: '#f44336',
    //   dark: '#ba000d',
    //   contrastText: '#000',
    // },

    primary: {
      light: '#ffcd38',
      main: '#ffc107',
      dark: '#b28704',
      contrastText: '#000',
    },
    secondary: {
      light: '#33bfff',
      main: '#00b0ff',
      dark: '#007bb2',
      contrastText: '#FFF',
    },
  },
  typography: {
    uesNextVariants: true
  },
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 20px auto'
  },
  pagetitle: {
    margin: '10px auto 10px auto'
  },
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    marginTop: 20,
    position: 'relative'
  },
  customError: {
    color: 'red',
    fontSize: '0.8rem',
    marginTop: 10
  },
  progress: {
    position: 'absolute'
  }
});

// To authenticate if the token is not expired, no initial value
const token = localStorage.FBIdToken;
if(token){
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    // Redirect to login page
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
  else{
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getBreederData());
  }
}

export class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <Route exact path="/application" component={application} />
                <Route exact path="/login" component={login} />
                {/* <Route exact path="/signup" component={signup} /> */}
                <Route exact path="/search" component={search} />
                <Route exact path="/profile" component={profile} />
                <Route exact path="/pet" component={pet} />
                <Route exact path="/petowner" component={PetOwner} />
                <Route exact path="/" component={NewHome} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App