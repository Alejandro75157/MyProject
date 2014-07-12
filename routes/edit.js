var express = require('express');
var router = express.Router();
var ArticleModel = require('../mongoose').ArticleModel;

router.get('/:id/edit', function(req, res) {
    ArticleModel.findById(req.param('_id'), function(error, article) {
        res.render('article_edit.jade', { article: article });
    });
});

router.post('/:id/edit', function (req, res){
    return ArticleModel.findById(req.param('_id'), function (err, article) {
        if(!article) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }

        article.title = req.body.title;
        article.description = req.body.description;
        article.author = req.body.author;
        article.images = req.body.images;
        return article.save(function (err) {
            if (!err) {
                res.redirect('/');
                log.info("article updated");
            } else {
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
});

module.exports = router;
