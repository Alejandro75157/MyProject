var models = require('./models');

module.exports = {
    check: function () {
        models.Article.find({}, function (err, articles) {
            if (articles.length === 0) {
                console.log('no articles found, seeding...');
                for (var i = 1; i <= 3; i++) {
                    var newArticle = new models.Article({
                        title: "Title " + i,
                        author: "Author " + i,
                        description: "Description " + i
                    });
                    newArticle.save(function (err, contact) {
                        console.log('successfully inserted article: ' + contact._id);
                    });
                }
            } else {
                console.log('found ' + articles.length + ' existing contacts!');
            }
        });
    }
};
