var request = require('supertest');
var app = require('../../app');

describe('/', function () {
    this.timeout(10000);
    it('GET', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200, done);
    });
    it('POST lack of form', function (done) {
        request(app)
            .post('/')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(400, done);
    });
    it('POST lack of instance', function (done) {
        request(app)
            .post('/')
            .send('ls_url=https://localhost.localhost/')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(400, done);
    });
    it('POST lack of ls_url', function (done) {
        request(app)
            .post('/')
            .send('instance=post-test')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(400, done);
    });
    it('POST invalid ls_url', function (done) {
        request(app)
            .post('/')
            .send('instance=post-test')
            .send('ls_url=https://localhost.localhost/')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(404, done);
    });
    it('POST acceptable', function (done) {
        request(app)
            .post('/')
            .send('instance=post-test')
            .send('ls_url=https://www.youtube.com/watch?v=60a4dJfjCvE')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200, done);
    });
});
