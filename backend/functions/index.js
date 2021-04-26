//Import firebase build-in functions
const functions = require("firebase-functions");
const app = require('express')();

//Import self-defined functions from other folders
const FBAuth = require('./util/fbAuth');
const { getAllScreams , postOneScream} = require('./handlers/scream');
const {signup, login, uploadImage, addUserDetails, getAuthenticatedUser} = require('./handlers/user');


//Scream route
app.get('/screams', getAllScreams); //Fetch all datas (In JSON format) from collection "Scream"
app.post('/scream', FBAuth, postOneScream); //Post one document onto collection "scream"

//User route
app.post('/signup', signup); //Sign up function, once signed up, add a document to collection "users" and return a token (used to identify user)
app.post('/login', login); //Login funtion, once logged in, return a token (used to identify user)
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)
app.get('/user', FBAuth, getAuthenticatedUser);

//Other route could be added below, you could refer to functions above to design new functions

//This line exports API functions of firebse in HTTP form
exports.api = functions.https.onRequest(app);