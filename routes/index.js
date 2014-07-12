var express = require('express');
var router = express.Router();
var ArticleModel = require('../mongoose').ArticleModel;


router.get('/', function(req, res) {
    return ArticleModel.find(function (err, articles) {
        if (!err) {
            res.render('articles.jade', { title: 'Articles', articles: articles});
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

module.exports = router;
