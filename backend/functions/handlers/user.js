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


// Get authenticated user details
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

exports.uploadImageBreeder = (req, res) => {
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
        //my.image.png
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

exports.uploadImagePetOwner = (req, res) => {
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
        //my.image.png
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
            return db.doc(`/PetOwners/${req.user.handle}`).update({ profile_photo: imageUrl });
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
        //my.image.png
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
            return `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        })
        .then( imageUrl => {
            return res.json({ imageUrl: imageUrl });
        })
        .catch(err => {
            console.error(err);
            return res.staus(500).json({ error: err.code });
        });
    });
    busboy.end(req.rawBody);
};

exports.uploadDogImageInformation = (req, res) => {
    db.doc(`/PuppyBreeders/${req.user.handle}/Dogs/${req.body.dogId}`).update({ 
        images:  admin.firestore.FieldValue.arrayUnion(req.body.imageUrl)
    })
    .then(() => {
        return res.json( {message: 'Image uploaded successfully'});
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};



