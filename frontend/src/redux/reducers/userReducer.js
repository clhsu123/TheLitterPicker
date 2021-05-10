import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from '../types';

const initialState = {
    authenticated: false,
    /*
    address: "",
    applications: [],
    background_photo: "",
    contact_email: "",
    registration_email: "",
    dog_breed_type: "",
    handle: "",
    overview: "",
    tags: [],
    profile_photo: "",
    createdAt: "",
    phone: "",
    title: "",
    */
    credentials: {}
};

export default function(state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
                return initialState;
        case SET_USER:
                return {
                    authenticated: true,
                    ...action.payload
                };
        default:
           return state; 
    }
}