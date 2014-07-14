var Marionette = require('backbone.marionette');

var itemView = Marionette.ItemView.extend({
    template: require('../../templates/article_small.hbs'),
    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },
    events: {
        'click a.update': 'updateArticle',
        'click a.delete': 'deleteArticle',
        'click a.show': 'showDetails'
    },

    showDetails: function(e) {
        e.preventDefault();
        window.App.core.vent.trigger('app:log', 'Contacts View: showDetails hit.');
        window.App.controller.details(this.model.id);
    },

    updateArticle: function(e) {
        e.preventDefault();
        window.App.core.vent.trigger('app:log', 'Contacts View: showDetails hit.');
        window.App.controller.showUpdate(this.model.id);
    },

    deleteArticle: function(e) {
        e.preventDefault();
        console.log('Deleting article');
        window.App.data.articles.remove(this.model);

        this.model.destroy();

        window.App.controller.home();
    }
});

module.exports = CollectionView = Marionette.CollectionView.extend({
    initialize: function() {
        this.listenTo(this.collection, 'change', this.render);
    },
    itemView: itemView
});
