var Backbone = require('backbone');

module.exports = ArticleModel = Backbone.Model.extend({
    idAttribute: '_id',
    urlRoot: 'api/articles'
});
