const { db } = require('../util/admin');

exports.getApplication = (req, res) => {
    db
    .collection('Applications')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
        let applications = [];
        data.forEach(doc => {
            applications.push({
                applicationId: doc.id,
                phone: doc.data().phone,
                email: doc.data().email,
                firstname: doc.data().firstname,
                lastname: doc.data().lastname,
                address1: doc.data().address1,
                address2: doc.data().address2,
                city: doc.data().city,
                state: doc.data().state,
                zip: doc.data().zip,
                country: doc.data().country,
                currentLivingStatus: doc.data().currentLivingStatus,
                fullyFencedYard: doc.data().fullyFencedYard,
                areaOfInterest: doc.data().areaOfInterest,
                currentDog: doc.data().currentDog,
                preferredGender: doc.data().preferredGender,
                generalPreference: doc.data().generalPreference,
                preferenceOriented: doc.data().preferenceOriented,
                additionInformation: doc.data().additionInformation,
                createdAt: doc.data().createdAt
            });
        });
        return res.json(applications);
    })
    .catch(err => console.error(err));
}

exports.updateApplication = (req, res) => {
    const newApplication = {
        phone: req.body.phone,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
        currentLivingStatus: req.body.currentLivingStatus,
        fullyFencedYard: req.body.fullyFencedYard,
        areaOfInterest: req.body.areaOfInterest,
        currentDog: req.body.currentDog,
        preferredGender: req.body.preferredGender,
        generalPreference: req.body.generalPreference,
        preferenceOriented: req.body.preferenceOriented,
        additionInformation: req.body.additionInformation,
        createdAt: new Date().toISOString()
    };

    db
        .collection('Applications')
        .add(newApplication)
        .then(doc => {
            res.json({message: `documnet ${doc.id} created successfully`});
        })
        .catch(err => {
            res.status(500).jason({ error: 'something went wrong'});
            console.error(err);
        })
}


exports.getBreederApplication = (req, res) => {
    db
    .collection('Applications')
    .where('breederHandle', '==', req.body.handle)
    .get()
    .then(data => {
        let applications = [];
        data.forEach(doc => {
            applications.push({
                applicationId: doc.id,
                breederHandle: doc.data().breederHandle,
                adopterHandle: doc.data().adopterHandle,
                phone: doc.data().phone,
                email: doc.data().email,
                firstname: doc.data().firstname,
                lastname: doc.data().lastname,
                address1: doc.data().address1,
                address2: doc.data().address2,
                city: doc.data().city,
                state: doc.data().state,
                status: doc.data().status,
                zip: doc.data().zip,
                country: doc.data().country,
                currentLivingStatus: doc.data().currentLivingStatus,
                fullyFencedYard: doc.data().fullyFencedYard,
                areaOfInterest: doc.data().areaOfInterest,
                currentDog: doc.data().currentDog,
                preferredGender: doc.data().preferredGender,
                generalPreference: doc.data().generalPreference,
                preferenceOriented: doc.data().preferenceOriented,
                additionInformation: doc.data().additionInformation,
                createdAt: doc.data().createdAt
            });
        });
        return res.json(applications);
    })
    .catch(err => console.error(err));
}

exports.getBreederApplicationSecure = (req, res) => {
    db
    .collection('Applications')
    .where('breederHandle', '==', req.user.handle)
    .get()
    .then(data => {
        let applications = [];
        data.forEach(doc => {
            applications.push({
                applicationId: doc.id,
                breederHandle: doc.data().breederHandle,
                adopterHandle: doc.data().adopterHandle,
                phone: doc.data().phone,
                email: doc.data().email,
                firstname: doc.data().firstname,
                lastname: doc.data().lastname,
                address1: doc.data().address1,
                address2: doc.data().address2,
                city: doc.data().city,
                state: doc.data().state,
                status: doc.data().status,
                zip: doc.data().zip,
                country: doc.data().country,
                currentLivingStatus: doc.data().currentLivingStatus,
                fullyFencedYard: doc.data().fullyFencedYard,
                areaOfInterest: doc.data().areaOfInterest,
                currentDog: doc.data().currentDog,
                preferredGender: doc.data().preferredGender,
                generalPreference: doc.data().generalPreference,
                preferenceOriented: doc.data().preferenceOriented,
                additionInformation: doc.data().additionInformation,
                createdAt: doc.data().createdAt
            });
        });
        return res.json(applications);
    })
    .catch(err => console.error(err));
}

exports.getPetOwnerApplication = (req, res) => {
    db
    .collection('Applications')
    .where('adopterHandle', '==', req.body.handle)
    .get()
    .then(data => {
        let applications = [];
        data.forEach(doc => {
            applications.push({
                applicationId: doc.id,
                breederHandle: doc.data().breederHandle,
                adopterHandle: doc.data().adopterHandle,
                phone: doc.data().phone,
                email: doc.data().email,
                firstname: doc.data().firstname,
                lastname: doc.data().lastname,
                address1: doc.data().address1,
                address2: doc.data().address2,
                city: doc.data().city,
                state: doc.data().state,
                status: doc.data().status,
                zip: doc.data().zip,
                country: doc.data().country,
                currentLivingStatus: doc.data().currentLivingStatus,
                fullyFencedYard: doc.data().fullyFencedYard,
                areaOfInterest: doc.data().areaOfInterest,
                currentDog: doc.data().currentDog,
                preferredGender: doc.data().preferredGender,
                generalPreference: doc.data().generalPreference,
                preferenceOriented: doc.data().preferenceOriented,
                additionInformation: doc.data().additionInformation,
                createdAt: doc.data().createdAt
            });
        });
        return res.json(applications);
    })
    .catch(err => console.error(err));
}

exports.getPetOwnerApplicationSecure = (req, res) => {
    db
    .collection('Applications')
    .where('adopterHandle', '==', req.user.handle)
    .get()
    .then(data => {
        let applications = [];
        data.forEach(doc => {
            applications.push({
                applicationId: doc.id,
                breederHandle: doc.data().breederHandle,
                adopterHandle: doc.data().adopterHandle,
                phone: doc.data().phone,
                email: doc.data().email,
                firstname: doc.data().firstname,
                lastname: doc.data().lastname,
                address1: doc.data().address1,
                address2: doc.data().address2,
                city: doc.data().city,
                state: doc.data().state,
                status: doc.data().status,
                zip: doc.data().zip,
                country: doc.data().country,
                currentLivingStatus: doc.data().currentLivingStatus,
                fullyFencedYard: doc.data().fullyFencedYard,
                areaOfInterest: doc.data().areaOfInterest,
                currentDog: doc.data().currentDog,
                preferredGender: doc.data().preferredGender,
                generalPreference: doc.data().generalPreference,
                preferenceOriented: doc.data().preferenceOriented,
                additionInformation: doc.data().additionInformation,
                createdAt: doc.data().createdAt
            });
        });
        return res.json(applications);
    })
    .catch(err => console.error(err));
}

exports.addApplicationSecure = (req, res) => {
    let applicationId;
    const newApplication = {
        breederHandle: req.body.handle,
        adopterHandle: req.user.handle,
        phone: req.body.phone,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        status: 0,
        zip: req.body.zip,
        status: 0,
        country: req.body.country,
        currentLivingStatus: req.body.currentLivingStatus,
        fullyFencedYard: req.body.fullyFencedYard,
        areaOfInterest: req.body.areaOfInterest,
        currentDog: req.body.currentDog,
        preferredGender: req.body.preferredGender,
        generalPreference: req.body.generalPreference,
        preferenceOriented: req.body.preferenceOriented,
        additionInformation: req.body.additionInformation,
        createdAt: new Date().toISOString()
    };
    db
        .collection('Applications')
        .add(newApplication)
        .then(doc => {
            applicationId = doc.id;
            db.doc(`Applications/${applicationId}`)
            .update({ applicationId: applicationId })
        })
        .then(() => {
            return res.json({message: `documnet ${applicationId} created successfully`});
        })
        .catch(err => {
            res.status(500).jason({ error: 'something went wrong'});
            console.error(err);
        })
}

exports.updateApplicationSecure = (req, res) => {
    let applicationDetails = req.body;
    db.doc(`/Applications/${applicationDetails.applicationId}`).update(applicationDetails)
        .then(() => {
            return res.json({ message: 'Details added successfully'});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code})
        });
};

exports.deleteApplication = (req, res) => {
    const applicationId = req.body.applicationId;
    db.doc(`/Applications/${applicationId}`).delete()
    .then(() => {
        return res.json({ message: `Document ${applicationId} deleted`});
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({error: err.code});
    });
}