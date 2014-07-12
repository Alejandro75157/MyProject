var express = require('express');
var router = express.Router();
var ArticleModel = require('../mongoose').ArticleModel;


router.post('/:id/delete', function (req, res){
    return ArticleModel.findById(req.param('_id'), function (err, article) {
        if(!article) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        return article.remove(function (err) {
            if (!err) {
                res.redirect('/');
                log.info("article removed");
                return res.send({ status: 'OK' });
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s',res.statusCode,err.message);
                return res.send({ error: 'Server error' });
            }
        });
    });
});

module.exports = router;