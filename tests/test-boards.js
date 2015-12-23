const chai = require('chai');
chai.should();
chai.use(require('chai-things'));

const main = require('../main');
const request = require('supertest-as-promised')
    .agent(main.app.listen());


const PATH = '/api/boards';
describe(PATH, function() {
    it('should return boards list', function(done) {
        request.get(PATH)
            .expect(200)
            .expect(function(res) {
                res.body.should.include({name: 'Бред', prefix: 'b'});
            })
            .end(done);
    });
});