/* jshint -W030 */
var proxyquire = require('proxyquire'),
    modelsStub = {},
    Articles = proxyquire('../../controllers/articles', {
        '../app/models': modelsStub
    });

var res = {},
    req = {};

describe('Articles Controller', function () {
    beforeEach(function () {
        res = {
            json: sinon.spy()
        };
        req = {
            params: {
                id: 1
            }
        };
        modelsStub.Article = {
            find: function (query, callback) {
                callback(null, {});
            },
            save: function (err, callback) {
                callback(null, req.body);
            },
            update: function (criteria, data, callback) {
                callback(null, req.body);
            }
        };
    });

    it('should exist', function () {
        expect(Articles).to.exist;
    });

    describe('index', function () {
        it('should be defined', function () {
            expect(Articles.index).to.be.a('function');
        });

        it('should send json', function () {
            Articles.index(req, res);
            expect(res.json).calledOnce;
        });
    });

    describe('getById', function () {
        it('should be defined', function () {
            expect(Articles.getById).to.be.a('function');
        });

        it('should send json on successful retrieve', function () {
            Articles.getById(req, res);
            expect(res.json).calledOnce;
        });

        it('should send json error on error', function () {
            modelsStub.Article = {
                find: function (query, callback) {
                    callback(null, {error: 'Article not found.'});
                }
            };
            Articles.getById(req, res);
            expect(res.json).calledWith({error: 'Article not found.'});
        });
    });

    describe('add', function () {
        beforeEach(function () {
            req.body = {
                title: 'testing',
                author: 'test@testing.com',
                description: '123-456-7890'
            };
        });

        it('should be defined', function () {
            expect(Articles.add).to.be.a('function');
        });

        it('should return json on save', function () {
            modelsStub.Article = sinon.spy(function () {
                modelsStub.Article.prototype.save = function (callback) {
                    callback(null, req.body);
                };
                return;
            });

            Articles.add(req, res);
            expect(res.json).calledWith(req.body);
        });
        it('should return error on failed save', function () {
            modelsStub.Article = sinon.spy(function () {
                modelsStub.Article.prototype.save = function (callback) {
                    callback({}, req.body);
                };
                return;
            });

            Articles.add(req, res);
            expect(res.json).calledWith({error: 'Error adding Article.'});
        });
    });

    describe('update', function () {
        beforeEach(function () {
            req.body = {
                id: 1,
                title: 'testing updated',
                author: 'test@testing.com updated',
                description: '123-456-7890 updated'
            };
        });

        it('should be defined', function () {
            expect(Articles.update).to.be.a('function');
        });

        it('should return json on update', function () {
            Articles.update(req, res);
            expect(res.json).calledWith(req.body);
        });

        it('should return error on failed update', function () {
            modelsStub.Article = {
                update: function (criteria, data, callback) {
                    callback(null, {error: 'Error updating Article.'});
                }
            };

            Articles.update(req, res);
            expect(res.json).calledWith({error: 'Error updating Article.'});
        });
    });

    describe('delete', function () {
        beforeEach(function () {
            req.body = {
                id: '1',
                title: 'testing',
                author: 'test@testing.com',
                description: '123-456-7890'
            };
        });

        it('should be defined', function () {
            expect(Articles.delete).to.be.a('function');
        });

        it('should return json on save', function () {
            var ArticleSpy = {remove: sinon.spy()};
            modelsStub.Article = {
                findOne: function (query, callback) {
                    callback(null, ArticleSpy);
                }
            };

            Articles.delete(req, res);
            expect(ArticleSpy.remove).calledOnce;
        });
        it('should return error on failed save', function () {
            modelsStub.Article = {
                findOne: function (query, callback) {
                    callback({}, {});
                }
            };

            Articles.delete(req, res);
            expect(res.json).calledWith({error: 'Article not found.'});
        });
    });
});
