var Marionette = require('backbone.marionette');

module.exports = ArticleDetailsView = Marionette.ItemView.extend({
    template: require('../../templates/article_details.hbs'),
    events: {
        'click a.back': 'goBack',
        'click a.delete': 'deleteArticle'
    },

    goBack: function(e) {
        e.preventDefault();
        window.App.controller.home();
    },

    deleteArticle: function(e) {
        e.preventDefault();
        console.log('Deleting article');
        window.App.data.articles.remove(this.model);

        // this will actually send a DELETE to the server:
        this.model.destroy();

        window.App.controller.home();
    }
});
