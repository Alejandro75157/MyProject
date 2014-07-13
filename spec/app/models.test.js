/* jshint -W030 */
var models = require('../../app/models');

describe('Models', function() {

    describe('Article', function() {
        var schema = models.Article.schema.paths;

        it('should exist', function() {
            expect(models.Article).to.exist;
        });

        it('should have title string field', function() {
            expect(schema.title).to.exist;
            expect(schema.title.instance).to.equal('String');
        });

        it('should have author string field', function() {
            expect(schema.author).to.exist;
            expect(schema.author.instance).to.equal('String');
        });

        it('should have description string field', function() {
            expect(schema.description).to.exist;
            expect(schema.description.instance).to.equal('String');
        });

        it('should have modified Date field', function() {
            expect(schema.modified).to.exist;
            expect(schema.modified.defaultValue).to.be.a('function');
        });
    });
});
