var Marionette = require('backbone.marionette');

module.exports = updateView = Marionette.ItemView.extend({
    template: require('../../templates/edit.hbs'),
    events: {
        'click a.update-button': 'edit'
    },

    edit: function(e) {
        e.preventDefault();
        var updateArticle = {
            id: this.model.id,
            title: this.$el.find('#title').val(),
            author: this.$el.find('#author').val(),
            description: this.$el.find('#description').val()
        };

        this.model.save(updateArticle);

        var items = window.App.data.articles.where({id: this.model.id});
        items[0].set(updateArticle);

        window.App.core.vent.trigger('app:log', 'Add View: Saved new article!');
        window.App.controller.home();
    }
});