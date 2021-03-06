//Import firebase build-in functions
const functions = require("firebase-functions");
const app = require('express')();

//Import self-defined functions from other folders
const { FBBreederAuth , FBPetAuth } = require('./util/fbAuth');
const { login,
        uploadImageBreeder, 
        uploadImage, 
        uploadDogImageInformation,
        uploadImagePetOwner } = require('./handlers/user');
const { signup_as_breeder,
        addBreederDetails,
        getBreederByBreedType,
        add_breeder_details_by_handle,
        get_breeder_details,
        get_breeder_details_by_handle,
        add_dog_to_breeder,
        updateDog,
        getDog,
        getDogByHandle,
        deleteDog
    } = require('./handlers/breeders');
const { signup_as_pet_owner,
        addPetDetails,
        add_pet_owner_details_by_handle,  
        get_pet_owner_details, 
        get_pet_owner_details_by_handle
    } = require('./handlers/petOwners');
const { getApplication, 
        updateApplication, 
        getBreederApplication, 
        getPetOwnerApplication, 
        updateApplicationSecure,
        addApplicationSecure,
        getBreederApplicationSecure,
        getPetOwnerApplicationSecure,
        deleteApplication
    } = require('./handlers/application');
const {
    add_news_to_breeder,
    update_news,
    getNews,
    getNewsbyHandle,
    deleteNews
    } = require('./handlers/news');

//Breeder and Pet owner routes
app.post('/user/image/breeder', FBBreederAuth, uploadImageBreeder);
app.post('/user/image/petowner', FBPetAuth, uploadImagePetOwner);
app.post('/add_breeder_details', FBBreederAuth, addBreederDetails);
app.post('/add_breeder_details_by_handle', add_breeder_details_by_handle);
app.get('/get_breeder_details', FBBreederAuth, get_breeder_details);
app.post('/get_breeder_details_by_handle', get_breeder_details_by_handle);
app.post('/add_pet_owner_details', FBPetAuth, addPetDetails);
app.get('/get_pet_owner_details', FBPetAuth, get_pet_owner_details);
app.post('/get_pet_owner_details_by_handle', get_pet_owner_details_by_handle);
app.post('/add_pet_owner_details_by_handle', add_pet_owner_details_by_handle);
app.post('/get_breeder_by_breed_type', getBreederByBreedType);

//Login and Signup
app.post('/login', login);
app.post('/signup_as_breeder', signup_as_breeder);
app.post('/signup_as_pet_owner', signup_as_pet_owner);

//Dogs
app.post('/add_dog_to_breeder', FBBreederAuth, add_dog_to_breeder);
app.get('/get_dog', FBBreederAuth, getDog);
app.post('/get_dog_by_breeder_handle', getDogByHandle);
app.post('/update_dog', FBBreederAuth, updateDog);
app.post('/dogImage', uploadImage);
app.post('/dogImageInformation', FBBreederAuth, uploadDogImageInformation);
app.post('/delete_dog', FBBreederAuth, deleteDog);

//News
app.post('/add_news_to_breeder', FBBreederAuth, add_news_to_breeder);
app.post('/update_news', FBBreederAuth, update_news);
app.get('/get_news', FBBreederAuth, getNews);
app.post('/newsImage', uploadImage);
app.post('/get_news_by_handle', getNewsbyHandle);
app.post('/delete_news', FBBreederAuth, deleteNews);

//Application
app.get('/get_application', getApplication);
app.post('/update_application', updateApplication);
app.post('/delete_application', deleteApplication);

//Fetch specific user's application and update applications of specific users
app.post('/get_application_breeder', getBreederApplication);
app.post('/get_application_breeder_secure',FBBreederAuth, getBreederApplicationSecure);
app.post('/get_application_pet_owner', getPetOwnerApplication);
app.post('/get_application_pet_owner_secure', FBPetAuth, getPetOwnerApplicationSecure);
app.post('/add_application_secure', FBPetAuth, addApplicationSecure);
app.post('/update_application_secure', updateApplicationSecure);

//This line exports API functions of firebse in HTTP form
exports.api = functions.https.onRequest(app);