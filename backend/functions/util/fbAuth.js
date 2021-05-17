
const { db, admin } = require('./admin');

exports.FBBreederAuth = (req, res, next) => {
    let idToken;
    if(req.headers.authorization && req.headers.authorization.startsWith('Breeder ')){
        idToken = req.headers.authorization.split('Breeder ')[1];
    } else {
        console.error('No token found')
        return res.status(403).json({ error: 'Unauthorized'});
    }

    admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
        req.user = decodedToken;
        console.log(decodedToken);
        return db.collection('PuppyBreeders')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get();
    })
    .then(data =>{
        req.user.handle = data.docs[0].data().handle;
        return next();
    })
    .catch(err => {
        console.error('Error while verifying token ', err);
        return res.status(403).json(err); 
    })
};

exports.FBPetAuth = (req, res, next) => {
    let idToken;
    if(req.headers.authorization && req.headers.authorization.startsWith('PetOwner ')){
        idToken = req.headers.authorization.split('PetOwner ')[1];
    } else {
        console.error('No token found')
        return res.status(403).json({ error: 'Unauthorized'});
    }

    admin.auth().verifyIdToken(idToken)
    .then(decodedToken => {
        req.user = decodedToken;
        console.log(decodedToken);
        return db.collection('PetOwners')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get();
    })
    .then(data =>{
        req.user.handle = data.docs[0].data().handle;
        return next();
    })
    .catch(err => {
        console.error('Error while verifying token ', err);
        return res.status(403).json(err); 
    })
};