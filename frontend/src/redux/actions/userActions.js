import axios from 'axios';
import { SET_USER_BREEDER,
    SET_USER_PET_OWNER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI, 
    SET_UNAUTHENTICATED ,
    LOADING_USER
} from '../types';

export const loginBreeder = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
            .post('/login', userData)
            .then(res=>{
                setAuthorizationHeader(res.data.token);
                dispatch(getBreederData());
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

export const loginPetOwner = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
            .post('/login', userData)
            .then(res=>{
                setAuthorizationHeader(res.data.token);
                dispatch(getPetOwnerdata());
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
                dispatch(getBreederData());
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

export const signupPetOwner = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
            .post('/signup_as_pet_owner', newUserData)
            .then(res=>{
                setAuthorizationHeader(res.data.token);
                dispatch(getPetOwnerdata());
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

export const getBreederData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get('/get_breeder_details')
        .then(res => {
            dispatch({
                type: SET_USER_BREEDER,
                payload: res.data[0]
            })
        })
        .catch(err =>console.log(err));
};

export const getPetOwnerdata = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get('/get_pet_owner_details')
        .then(res => {
            dispatch({
                type: SET_USER_PET_OWNER,
                payload: res.data[0]
            })
        })
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
};

export const uploadBreederProfileImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user/image', formData)
        .then(res => {
            dispatch(getBreederData());
        })
        .catch(err => console.log(err));
};

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};