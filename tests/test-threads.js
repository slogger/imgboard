const chai = require('chai');
chai.should();
chai.use(require('chai-things'));

const main = require('../main');
const request = require('supertest-as-promised')
    .agent(main.app.listen());

const co = require('co');

const Thread = require('../app/models/thread');
const Message = require('../app/models/message');


const PATH = '/api/threads';
describe(PATH, function() {
    var testThread = {title: 'Тест', board: 'b'};
    it('should create thread', () => {
        request
            .post(PATH)
            .send(testThread)
            .expect(200)
            .expect((r) => r.body.should.include(testThread));
    });
    it('should get threads', () => {
        request
            .get(PATH)
            .expect(200)
            .expect(
                (r) => r.body
                    .should.contain.some
                    .have.property('title', testThread.title)
            );
    });

    it('should sort threads by recent message', co.wrap(function*() {
        var chanThread = {title: 'Няшить тян', board: 'b'};
        var yourFatherThread = {title: 'Люк, я твой отец', board: 'b'};

        yield request
            .post(PATH)
            .send(chanThread)
            .expect(200)
            .expect((r) => r.body.should.include(chanThread));

        yield request
            .post(PATH)
            .send(yourFatherThread)
            .expect(200)
            .expect((r) => r.body.should.include(yourFatherThread));

        var _chanThread = yield Thread.findOne({title: chanThread.title});
        var _chanThreadId = String(_chanThread._id);

        var fakeMessage = {
            autor: 'Anonchik',
            text: 'Не твоя личная армия!'
        };
        yield request
            .post('/api/messages/' + _chanThreadId)
            .send(fakeMessage)
            .expect(200)
            .expect((r) => r.body.should.include(fakeMessage));

        var expected = _chanThread.toObject();
        expected = JSON.stringify(expected);
        expected = JSON.parse(expected);
        delete expected.last_update;

        yield request
            .get(PATH + '?recent')
            .expect(200)
            .expect((r) => r.body[0].should.include(expected))
    }));

    it('should get threads by board name', () => {
        request
            .get(PATH + '?board=b')
            .expect(200)
            .expect(
                (r) => r.body
                    .should.all
                    .have.property('board', 'b')
            );
    });

    it('should get threads with limit', () => {
        request
            .get(PATH + '?limit=3')
            .expect(200)
            .expect((r) => r.body.to.have.below(4));
    });
});
