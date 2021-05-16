const { db } = require('../util/admin');
const config = require('../util/config');
const firebase = require('firebase');
const { validateSignupData , validateLoginData, reduceUserDetails} = require('../util/validaters');

exports.signup_as_pet_owner = (req,res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };

    const { errors, valid } = validateSignupData(newUser);

    if(!valid) return res.status(400).json(errors);

    const noImg = 'no-img.png';


    let token, userId;
    db.doc(`/PetOwners/${newUser.handle}`).get()
       .then(doc => {
           if(doc.exists){
               //Return client error (status(400) refers to client error, while status(500) refer to server error)
               return res.status(400).json({ handle: 'this handle is already taken'});
           } else {
               // This return the data which contains a uid(unique id) for a newly signed up user
               return firebase
               .auth()
               .createUserWithEmailAndPassword(newUser.email, newUser.password);
           }
       })
       .then(data => {
           userId = data.user.uid;
           return data.user.getIdToken();
       }) 
       .then(idToken => {
           token = idToken;
           // Fields that would be added to the document of that user
           const userCredentials = {
               applications: [],
               handle: newUser.handle,
               registration_email: newUser.email,
               selfIntro: "Fill in something here~",
               //This is a default image url
               profile_photo: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
               //createdAt: new Date().toISOString(),
               userId: userId
           };
           return db.doc(`/PetOwners/${newUser.handle}`).set(userCredentials);
       })
       .then(() => {
           return res.status(201).json({ token });
       })
       .catch(err => {
           console.error(err);
           if(err.code === 'auth/email-already-in-use'){
               return res.status(400).json({ email: 'Email is already in use'})
           } else {
               return res.status(500).json({ error: err.code});
           }
       });
};

exports.addPetDetails = (req, res) => {
    let userDetails = req.body;
    db.doc(`/PetOwners/${req.user.handle}`).update(userDetails)
        .then(() => {
            return res.json({ message: 'Details added successfully'});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code})
        });
};

exports.add_pet_owner_details_by_handle = (req, res) => {
    let userDetails = req.body;
    db.doc(`/PetOwners/${userDetails.handle}`).update(userDetails)
        .then(() => {
            return res.json({ message: 'Details added successfully'});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code})
        });
};

exports.get_pet_owner_details= (req,res) => {
    db
        .collection('PetOwners')
        .where('handle', '==', req.user.handle)
        .get()
        .then((data) => {
            let pet_owners = [];
            data.forEach((doc) => {
                pet_owners.push( {
                    applications: doc.data().applications,
                    registration_email: doc.data().registration_email,
                    handle: doc.data().handle,
                    selfIntro: doc.data().selfIntro,
                    profile_photo: doc.data().profile_photo,
                    //createdAt: doc.data().createdAt
                });
            });
        return res.json(pet_owners);
    })
    .catch(err => console.error(err));
};

exports.get_pet_owner_details_by_handle= (req,res) => {
    db
        .collection('PetOwners')
        .where('handle', '==', req.body.handle)
        .get()
        .then((data) => {
            let pet_owners = [];
            data.forEach((doc) => {
                pet_owners.push( {
                    applications: doc.data().handle,
                    registration_email: doc.data().registration_email,
                    handle: doc.data().handle,
                    selfIntro: doc.data().selfIntro,
                    profile_photo: doc.data().profile_photo,

                    //createdAt: doc.data().createdAt
                });
            });
        return res.json(pet_owners);
    })
    .catch(err => console.error(err));
};