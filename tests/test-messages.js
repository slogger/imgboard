const chai = require('chai');
chai.should();
chai.use(require('chai-things'));

const main = require('../main');
const request = require('supertest-as-promised')
    .agent(main.app.listen());

const co = require('co');

const Thread = require('../app/models/thread');


const PATH = '/api/messages';
describe(PATH, function() {
    const fuckThread = {title: 'Лампово няшить тян тред', board: 'b'};
    it('should create message', co.wrap(function*() {
        var fakeThread = new Thread(fuckThread);
        yield fakeThread.save();

        var fuckThreadMessage = {
            autor: 'Anonimus',
            text: 'Да, лампово няшить тянок классно!'
        }
        yield request
            .post(PATH + '/' + String(fakeThread._id))
            .send(fuckThreadMessage)
            .expect(200)
            .expect((r) => r.body.should.include(fuckThreadMessage))
    }));
});
