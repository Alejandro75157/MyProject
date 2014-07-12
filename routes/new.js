var express = require('express');
var router = express.Router();
var ArticleModel = require('../mongoose').ArticleModel;

router.get('/new', function(req, res) {
    res.render('article_new.jade', { title: 'New Article'});
});

router.post('/new', function(req, res) {
    var article = new ArticleModel({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        images: req.body.images
    });

    article.save(function (err) {
        if (!err) {
            res.redirect('/');
            log.info("article created");
        } else {
            console.log(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
    });
});

module.exports = router;