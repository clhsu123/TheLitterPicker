const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();


app.get('/application', (req, res) => {
    admin
    .firestore()
    .collection('Application')
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
})

app.post('/application', (req, res) => {
    const newApplication = {
        // breederHandle: req.body.breederHandle,
        // adopterHandle: req.body.adopterHandle,
        phone: req.body.phone,
        createdAt: new Date().toISOString()
    };

    admin.firestore()
        .collection('Application')
        .add(newApplication)
        .then(doc => {
            res.json({message: `documnet ${doc.id} created successfully`});
        })
        .catch(err => {
            res.status(500).jason({ error: 'something went wrong'});
            console.error(err);
        })
})

exports.api = functions.https.onRequest(app);