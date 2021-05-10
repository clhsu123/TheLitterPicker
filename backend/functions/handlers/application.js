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
                breederHandle: doc.data().breederHandle,
                adopterHandle: doc.data().adopterHandle,
                createdAt: doc.data().createdAt
            });
        });
        return res.json(applications);
    })
    .catch(err => console.error(err));
}

exports.updateApplication = (req, res) => {
    const newApplication = {
        // breederHandle: req.body.breederHandle,
        // adopterHandle: req.body.adopterHandle,
        phone: req.body.phone,
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
