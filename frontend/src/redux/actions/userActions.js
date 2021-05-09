import axios from 'axios';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
            .post('/login', userData)
            .then(res=>{
                console.log(res.data);
                const FBIdToken = `Bearer ${res.data.token}`;
                localStorage.setItem('FBIdToken', FBIdToken);
                axios.defaults.headers.common['Authorization'] = FBIdToken;
                dispatch(getUserData());
                dispatch({ type: CLEAR_ERRORS});
                //Redirect to the home page
                history.push('/');
            })
            .catch(err => {
                dispatch({
                    typd: SET_ERRORS,
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