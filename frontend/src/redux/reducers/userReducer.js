import { SET_APPLICATION, SET_USER_BREEDER, SET_USER_PET_OWNER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER} from '../types';

const initialState = {
    authenticated: false,
    accountType: "",
    loading: false,
    address: "",
    applications: [],
    application_list: [],
    background_photo: "",
    contact_email: "",
    registration_email: "",
    dog_breed_type: "",
    handle: "",
    overview: "",
    selfIntro:"",
    tags: [],
    profile_photo: "",
    createdAt: "",
    phone: "",
    title: "",
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
        case SET_USER_BREEDER:
                return {
                    authenticated: true,
                    accountType: "breeder",
                    loading: false,
                    ...action.payload
                };
        case SET_USER_PET_OWNER:
                return {
                    authenticated: true,
                    accountType: "petowner",
                    loading: false,
                    ...action.payload
                };
        case SET_APPLICATION:
            return {
                ...state,
                application_list: action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            };
        default:
           return state; 
    }
}