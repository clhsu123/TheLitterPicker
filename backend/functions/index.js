//Import firebase build-in functions
const functions = require("firebase-functions");
const app = require('express')();

//Import self-defined functions from other folders
const { FBBreederAuth , FBPetAuth } = require('./util/fbAuth');
const { getAllScreams , postOneScream} = require('./handlers/scream');
const { signup, 
    login, 
    uploadImage, 
    addUserDetails, 
    getAuthenticatedUser, 
    signup_as_breeder, 
    signup_as_pet_owner, 
    addBreederDetails, 
    addPetDetails, 
    getBreederByBreedType, 
    add_breeder_details_by_handle, 
    add_pet_owner_details_by_handle, 
    get_breeder_details, 
    get_pet_owner_details, 
    get_breeder_details_by_handle,
    get_pet_owner_details_by_handle
    } = require('./handlers/user');
    
const { getApplication, updateApplication } = require('./handlers/application');


//Scream route
app.get('/screams', getAllScreams); //Fetch all datas (In JSON format) from collection "Scream"
//app.post('/scream', FBAuth, postOneScream); //Post one document onto collection "scream"

//User route
app.post('/signup', signup); //Sign up function, once signed up, add a document to collection "users" and return a token (used to identify user)
app.post('/login', login); //Login funtion, once logged in, return a token (used to identify user)
//app.post('/user/image', FBAuth, uploadImage)
//app.post('/user', FBAuth, addUserDetails)
//app.get('/user', FBAuth, getAuthenticatedUser);
app.post('/signup_as_breeder', signup_as_breeder);
app.post('/signup_as_pet_owner', signup_as_pet_owner);
app.post('/add_breeder_details', FBBreederAuth, addBreederDetails);
app.post('/add_breeder_details_by_handle', add_breeder_details_by_handle);
app.get('/get_breeder_details', FBBreederAuth, get_breeder_details);
app.post('/get_breeder_details_by_handle', get_breeder_details_by_handle);
app.post('/add_pet_owner_details', FBPetAuth, addPetDetails);
app.get('/get_pet_owner_details', FBPetAuth, get_pet_owner_details);
app.post('/get_pet_owner_details_by_handle', get_pet_owner_details_by_handle);
app.post('/add_pet_owner_details_by_handle', add_pet_owner_details_by_handle);
app.post('/get_breeder_by_breed_type', getBreederByBreedType);
//Other route could be added below, you could refer to functions above to design new functions

//Application
app.get('/get_application', getApplication);
app.post('/update_application', updateApplication);

//This line exports API functions of firebse in HTTP form
exports.api = functions.https.onRequest(app);