import axios from 'axios';
import { SET_USER_BREEDER,
    SET_USER_PET_OWNER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI, 
    SET_UNAUTHENTICATED ,
    LOADING_USER,
    SET_APPLICATION
} from '../types';

export const loginBreeder = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
            .post('/login', userData)
            .then(res=>{
                setAuthorizationHeaderBreeder(res.data.token);
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
                setAuthorizationHeaderPetOwner(res.data.token);
                dispatch(getPetOwnerData());
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
                setAuthorizationHeaderBreeder(res.data.token);
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
                setAuthorizationHeaderPetOwner(res.data.token);
                dispatch(getPetOwnerData());
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
            dispatch(getApplicationBreeder());
        })
        .catch(err =>console.log(err));
};

export const getPetOwnerData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.get('/get_pet_owner_details')
        .then(res => {
            dispatch({
                type: SET_USER_PET_OWNER,
                payload: res.data[0]
            })
            dispatch(getApplicationPetOwner());
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
export const editBreederDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/add_breeder_details', userDetails)
    .then(() => {
        dispatch(getBreederData());
    })
    .catch(err => console.log(err));
};
export const editPetOwnerDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/add_pet_owner_details', userDetails)
    .then(() => {
        dispatch(getPetOwnerData());
    })
    .catch(err => console.log(err));
};

export const getApplicationPetOwner = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
    .post('/get_application_pet_owner_secure')
    .then(res =>{
        dispatch({
            type: SET_APPLICATION,
            payload: res.data
        })
    })
    .catch(err => console.log(err));
}

export const getApplicationBreeder = () => (dispatch) => {
    dispatch({ type: LOADING_USER});
    axios
    .post('/get_application_breeder_secure')
    .then( res => {
        dispatch({
            type: SET_APPLICATION,
            payload: res.data
        })
    })
    .catch(err => console.log(err));
}
const setAuthorizationHeaderBreeder = (token) => {
    const FBIdToken = `Breeder ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};

const setAuthorizationHeaderPetOwner = (token) => {
    const FBIdToken = `PetOwner ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};
