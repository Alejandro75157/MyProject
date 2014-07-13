var models = require('../app/models');

module.exports = {
    index: function(req, res) {
        models.Article.find({}, function(err, data) {
            res.json(data);
        });
    },
    getById: function(req, res) {
        models.Article.find({ _id: req.params.id }, function(err, Article) {
            if (err) {
                res.json({error: 'Article not found.'});
            } else {
                res.json(Article);
            }
        });
    },
    add: function(req, res) {
        var newArticle = new models.Article(req.body);

        // Instance method call
        newArticle.save(function(err, Article) {
            if (err) {
                res.json({error: 'Error adding Article.'});
            } else {
                res.json(Article);
            }
        });
    },
    update: function(req, res) {
        // Class method call or static method call
         models.Article.update({ _id: req.body.id }, req.body, function(err, updated) {
             if (err) {
                 res.json({error: 'Error updating Article.'});
             } else {
                 res.json(updated);
             }
         })
    },
    delete: function(req, res) {
        models.Article.findOne({ _id: req.params.id }, function(err, Article) {
            if (err) {
                res.json({error: 'Article not found.'});
            } else {
                Article.remove(function(err, Article){
                    res.json(200, {status: 'Success'});
                })
            }
        });
    }
};
