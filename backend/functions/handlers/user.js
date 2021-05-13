const { admin, db } = require('../util/admin');
const config = require('../util/config');
const firebase = require('firebase');
firebase.initializeApp(config)
const { validateSignupData , validateLoginData, reduceUserDetails} = require('../util/validaters')
// Sign users up
exports.signup = (req,res) => {
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
    db.doc(`/users/${newUser.handle}`).get()
       .then(doc => {
           if(doc.exists){
               return res.status(400).json({ handle: 'this handle is already taken'});
           } else {
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
           const userCredentials = {
               handle: newUser.handle,
               email: newUser.email,
               imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
               createdAt: new Date().toISOString(),
               userId: userId
           };
           return db.doc(`/users/${newUser.handle}`).set(userCredentials);
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
exports.signup_as_breeder = (req,res) => {
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
    db.doc(`/PuppyBreeders/${newUser.handle}`).get()
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
                address: "",
                applications: [],
                background_photo: "",
                contact_email: "",
                dog_breed_type: "",
                handle: newUser.handle,
                registration_email: newUser.email,
                overview: "Fill in some info here~",
                phone: "",
                //This is a default image url
                profile_photo: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
                tags: [],
                title: "",
                //createdAt: new Date().toISOString(),
                userId: userId
           };
           return db.doc(`/PuppyBreeders/${newUser.handle}`).set(userCredentials);
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

//Log users in
exports.login = (req,res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const { errors, valid } = validateLoginData(user);

    if(!valid) return res.status(400).json(errors);
    if(Object.keys(errors).length > 0) return res.status(400).json(errors);

    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
        return data.user.getIdToken();
    })
    .then(token => {
        return res.json({token});
    })
    .catch(err => {
        console.error(err);
        if(err.code === 'auth/wrong-password' || err.code === 'auth/invalid-email'){
            return res.status(403).json({ general: 'Wrong credantials, please try again'});
        }
        return res.status(500).json({ error: err.code});
    });

};

//Add user details
exports.addUserDetails = (req, res) => {
    let userDetails = reduceUserDetails(req.body);

    db.doc(`/users/${req.user.handle}`).update(userDetails)
        .then(() => {
            return res.json({ message: 'Details added successfully'});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code})
        });
};

exports.addBreederDetails = (req, res) => {
    let userDetails = req.body;
    db.doc(`/PuppyBreeders/${req.user.handle}`).update(userDetails)
        .then(() => {
            return res.json({ message: 'Details added successfully'});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code})
        });
};

exports.add_breeder_details_by_handle = (req, res) => {
    let userDetails = req.body;
    db.doc(`/PuppyBreeders/${userDetails.handle}`).update(userDetails)
        .then(() => {
            return res.json({ message: 'Details added successfully'});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code})
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

// Get own use details
/*
exports.getAuthenticatedUser = (req, res) => {
    let userData = {};
    db.doc(`/users/${req.user.handle}`).get()
     .then(doc => {
         if(doc.exists){
             userData.credentials = doc.data();
             return db.collection('likes').where('userHandle', '==', req.user.handle).get()
         }
     })
     .then(data => {
         userData.likes = [];
         data.forEach(doc => {
             userData.likes.push(doc.data());
         });
         return res.json(userData);
     })
     .catch(err => {
         console.error(err);
         return res.status(500).json({ error: err.code });
     })
};
*/
// Upload image for users
exports.uploadImage = (req, res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new BusBoy({ headers: req.headers });

    let imageFileName;
    let imageToBeUploaded = {};
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        if(mimetype !== 'image/jpeg' && mimetype !== 'image/png'){
            return res.status(400).json({ error: 'Wrong file type submitted'});
        }
        // my.image.png
        const imageExtension = filename.split('.')[filename.split('.').length - 1];
        //64523456394923.png
        imageFileName = `${Math.round(Math.random()*100000000000)}.${imageExtension}`;
        const filepath = path.join(os.tmpdir(), imageFileName);
        imageToBeUploaded = { filepath, mimetype };
        file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on('finish', () => {
        admin
        .storage()
        .bucket()
        .upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata: {
                    contentType: imageToBeUploaded.mimetype
                }
            }
        })
        .then(() => {
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
            return db.doc(`/PuppyBreeders/${req.user.handle}`).update({ profile_photo: imageUrl });
        })
        .then(() => {
            return res.json( {message: 'Image uploaded succesfully'});
        })
        .catch(err => {
            console.error(err);
            return res.staus(500).json({ error: err.code });
        });
    });
    busboy.end(req.rawBody);
};

exports.getBreederByBreedType= (req,res) => {
    db
        .collection('PuppyBreeders')
        .where('dog_breed_type', '==', req.body.dog_breed_type)
        .get()
        .then((data) => {
            let breeders = [];
            data.forEach((doc) => {
                breeders.push( {
                    address: doc.data().address,
                    applications: doc.data().handle,
                    background_photo: doc.data().background_photo,
                    contact_email: doc.data().contact_email,
                    registration_email: doc.data().registration_email,
                    dog_breed_type: doc.data().dog_breed_type,
                    handle: doc.data().handle,
                    overview: doc.data().overview,
                    tags: doc.data().tags,
                    profile_photo: doc.data().profile_photo,
                    //createdAt: doc.data().createdAt,
                    phone: doc.data().phone,
                    title: doc.data().title,
                });
            });
        return res.json(breeders);
    })
    .catch(err => console.error(err));
}

exports.get_breeder_details= (req,res) => {
    db
        .collection('PuppyBreeders')
        .where('handle', '==', req.user.handle)
        .get()
        .then((data) => {
            let breeders = [];
            data.forEach((doc) => {
                breeders.push( {
                    address: doc.data().address,
                    applications: doc.data().applications,
                    background_photo: doc.data().background_photo,
                    contact_email: doc.data().contact_email,
                    registration_email: doc.data().registration_email,
                    dog_breed_type: doc.data().dog_breed_type,
                    handle: doc.data().handle,
                    overview: doc.data().overview,
                    tags: doc.data().tags,
                    profile_photo: doc.data().profile_photo,
                    //createdAt: doc.data().createdAt,
                    phone: doc.data().phone,
                    title: doc.data().title,
                });
            });
        return res.json(breeders);
    })
    .catch(err => console.error(err));
}

exports.get_breeder_details_by_handle=(req, res) => {
    db
        .collection('PuppyBreeders')
        .where('handle', '==', req.body.handle)
        .get()
        .then((data) => {
            let breeders = [];
            data.forEach((doc) => {
                breeders.push( {
                    address: doc.data().address,
                    applications: doc.data().applications,
                    background_photo: doc.data().background_photo,
                    contact_email: doc.data().contact_email,
                    registration_email: doc.data().registration_email,
                    dog_breed_type: doc.data().dog_breed_type,
                    handle: doc.data().handle,
                    overview: doc.data().overview,
                    tags: doc.data().tags,
                    profile_photo: doc.data().profile_photo,
                    //createdAt: doc.data().createdAt,
                    phone: doc.data().phone,
                    title: doc.data().title,
                });
            });
        return res.json(breeders);
    })
    .catch(err => console.error(err));
}

exports.get_pet_owner_details= (req,res) => {
    db
        .collection('PetOwners')
        .where('handle', '==', req.user.handle)
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
}

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
}