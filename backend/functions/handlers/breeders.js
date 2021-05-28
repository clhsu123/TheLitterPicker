const { db, admin } = require('../util/admin');
const config = require('../util/config');
const firebase = require('firebase');
const { validateSignupData , validateLoginData, reduceUserDetails} = require('../util/validaters');

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
};

exports.get_breeder_details= (req,res) => {
    db
        .collection('PuppyBreeders')
        .where('handle', '==', req.user.handle)
        .get()
        .then((data) => {
            let breeders = [];
            data.forEach((doc) => {
                breeders.push({
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
};


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
};

exports.add_dog_to_breeder = (req, res) => {
    let dogId;
    const new_data = {
       birthdate: req.body.birthdate,
       description: req.body.description,
       breed: req.body.breed,
       gender: req.body.gender,
       images: req.body.images,
       isPuppy: req.body.isPuppy,
       name: req.body.name,
       videos: req.body.videos
    }
    
    db.
        doc(`PuppyBreeders/${req.user.handle}`)
        .collection('Dogs')
        .add(new_data)
        .then(doc => {
            dogId = doc.id;
            db.doc(`PuppyBreeders/${req.user.handle}/Dogs/${dogId}`)
            .update({ dogId: dogId })
        })
        .then(()=> {
            res.json({ message: `document ${dogId} created successfully`});
        })
        .catch(err => {
            res.status(500).json({ error: `something went wrong`});
            console.error(err);
        });
};

exports.updateDog = (req, res) => {
    let dogDetails = req.body;
    db.doc(`/PuppyBreeders/${req.user.handle}/Dogs/${dogDetails.dogId}`).update(dogDetails)
        .then(() => {
            return res.json({ message: 'Details added successfully'});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code})
        });
};

exports.getDog = (req,res) => {
    db
        .collection(`PuppyBreeders/${req.user.handle}/Dogs`)
        .orderBy('birthdate', 'desc')
        .get()
        .then((data) => {
            let dogs = [];
            data.forEach((doc) => {
                dogs.push( {
                    dogId: doc.data().dogId,
                    birthdate: doc.data().birthdate,
                    description: doc.data().description,
                    breed: doc.data().breed,
                    gender: doc.data().gender,
                    images: doc.data().images,
                    isPuppy: doc.data().isPuppy,
                    name: doc.data().name,
                    videos: doc.data().videos
                });
            });
        return res.json(dogs);
    })
    .catch(err => console.error(err));
};

exports.deleteDog = (req,res) => {
    const dogId = req.body.dogId;
    db.doc(`PuppyBreeders/${req.user.handle}/Dogs/${dogId}`).delete()
    .then(() => {
        return res.json({ message: `Document ${dogId} deleted`});
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({error: err.code});
    });
}

exports.getDogByHandle = (req,res) => {
    db
        .collection(`PuppyBreeders/${req.body.handle}/Dogs`)
        .orderBy('birthdate', 'desc')
        .get()
        .then((data) => {
            let dogs = [];
            data.forEach((doc) => {
                dogs.push( {
                    birthdate: doc.data().birthdate,
                    description: doc.data().description,
                    gender: doc.data().gender,
                    images: doc.data().images,
                    isPuppy: doc.data().isPuppy,
                    name: doc.data().name,
                    videos: doc.data().videos
                });
            });
        return res.json(dogs);
    })
    .catch(err => console.error(err));
};