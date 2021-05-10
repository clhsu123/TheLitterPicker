import axios from 'axios';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
            .post('/login', userData)
            .then(res=>{
                setAuthorizationHeader(res.data.token);
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS});
                //Redirect to the home page
                history.push('/');
            })
            .catch(err => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            });
}

export const signupBreeder = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
            .post('/signup_as_breeder', newUserData)
            .then(res=>{
                setAuthorizationHeader(res.data.token);
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS });
                //Redirect to the home page
                history.push('/');
            })
            .catch(err => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                })
            });
}

export const getUserData = () => (dispatch) => {
    axios.get('/get_breeder_details')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err =>console.log(err));
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}