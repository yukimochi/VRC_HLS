var request = require('supertest');
var app = require('../../app');
const RedisEngine = require('../../classes/redis_engine');

before('Initialize Redis.', function () {
});

describe('/submit', function () {
    this.timeout(10000);
    var redis = new RedisEngine();
    redis.db.flushdb();
    redis.dispose();
    it('POST lack of form', function (done) {
        request(app)
            .post('/submit')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(400, done);
    });
    it('POST lack of instance', function (done) {
        request(app)
            .post('/submit')
            .send('ls_url=https://localhost.localhost/')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(400, done);
    });
    it('POST lack of ls_url', function (done) {
        request(app)
            .post('/submit')
            .send('instance=submit-test')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(400, done);
    });
    it('POST invalid ls_url', function (done) {
        request(app)
            .post('/submit')
            .send('instance=submit-test')
            .send('ls_url=https://localhost.localhost/')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(404, done);
    });
    it('POST acceptable', function (done) {
        request(app)
            .post('/submit')
            .send('instance=submit-test')
            .send('ls_url=https://www.youtube.com/watch?v=60a4dJfjCvE')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200, done);
    });
    it('POST acceptable/override', function (done) {
        request(app)
            .post('/submit')
            .send('instance=submit-test')
            .send('override=0')
            .send('ls_url=https://www.youtube.com/watch?v=60a4dJfjCvE')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200, done);
    });
});
