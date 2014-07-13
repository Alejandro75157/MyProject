var Marionette = require('backbone.marionette');

module.exports = AddView = Marionette.ItemView.extend({
    template: require('../../templates/add.hbs'),
    events: {
        'click a.save-button': 'save'
    },

    save: function(e) {
        e.preventDefault();
        var newArticle = {
            title: this.$el.find('#title').val(),
            author: this.$el.find('#author').val(),
            description: this.$el.find('#description').val()
        };

        window.App.data.articles.create(newArticle);
        window.App.core.vent.trigger('app:log', 'Add View: Saved new contact!');
        window.App.controller.home();
    }
});
