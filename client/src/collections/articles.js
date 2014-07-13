var Backbone = require('backbone'),
    ArticleModel = require('../models/article');

module.exports = ArticlesCollection = Backbone.Collection.extend({
    model:  ArticleModel,
    url: '/api/articles'
});
