var express = require('express');
var router = express.Router();
var ArticleModel = require('../mongoose').ArticleModel;


router.get('/:id', function(req, res) {
    return ArticleModel.findById(req.params('_id'), function (err, article) {
        if(!article) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (!err) {
            res.render('article.jade', { article: article });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

module.exports = router;
