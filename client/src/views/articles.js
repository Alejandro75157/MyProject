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
        alert("Update");
    },

    deleteArticle: function(e) {
        e.preventDefault();
        alert("Delete");
    }
});

module.exports = CollectionView = Marionette.CollectionView.extend({
    initialize: function() {
        this.listenTo(this.collection, 'change', this.render);
    },
    itemView: itemView
});
