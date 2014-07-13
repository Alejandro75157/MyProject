var home = require('../controllers/home'),
    articles = require('../controllers/articles');

module.exports.initialize = function(app) {
    app.get('/', home.index);
    app.get('/api/articles', articles.index);
    app.get('/api/articles/:id', articles.getById);
    app.post('/api/articles', articles.add);
    app.put('/api/articles/:id', articles.update);
    app.delete('/api/articles/:id', articles.delete);
};
