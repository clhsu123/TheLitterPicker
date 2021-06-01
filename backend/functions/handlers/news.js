const { db } = require('../util/admin');

exports.add_news_to_breeder = (req, res) => {
    let newsId;
    const new_data = {
       title: req.body.title,
       content: req.body.content,
       photo: req.body.photo
    }
    
    db.
        doc(`PuppyBreeders/${req.user.handle}`)
        .collection('News')
        .add(new_data)
        .then(doc => {
            newsId = doc.id;
            db.doc(`PuppyBreeders/${req.user.handle}/News/${newsId}`)
            .update({ newsId: newsId })
        })
        .then(()=> {
            res.json({ message: `document ${newsId} created successfully`});
        })
        .catch(err => {
            res.status(500).json({ error: `something went wrong`});
            console.error(err);
        });
};

exports.update_news = (req, res) => {
    let newsDetails = req.body;
    db.doc(`/PuppyBreeders/${req.user.handle}/News/${newsDetails.newsId}`).update(newsDetails)
        .then(() => {
            return res.json({ message: 'Details added successfully'});
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({error: err.code})
        });
};

exports.getNews = (req,res) => {
    db
        .collection(`PuppyBreeders/${req.user.handle}/News`)
        .get()
        .then((data) => {
            let news = [];
            data.forEach((doc) => {
                news.push( {
                    title: doc.data().title,
                    content: doc.data().content,
                    newsId: doc.data().newsId,
                    photo: doc.data().photo
                });
            });
        return res.json(news);
    })
    .catch(err => console.error(err));
};

exports.getNewsbyHandle = (req,res) => {
    db
        .collection(`PuppyBreeders/${req.body.handle}/News`)
        .get()
        .then((data) => {
            let news = [];
            data.forEach((doc) => {
                news.push( {
                    title: doc.data().title,
                    content: doc.data().content,
                    newsId: doc.data().newsId,
                    photo: doc.data().photo
                });
            });
        return res.json(news);
    })
    .catch(err => console.error(err));
};

exports.deleteNews = (req,res) => {
    const newsId = req.body.newsId;
    db.doc(`PuppyBreeders/${req.user.handle}/News/${newsId}`).delete()
    .then(() => {
        return res.json({ message: `Document ${newsId} deleted`});
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({error: err.code});
    });
}