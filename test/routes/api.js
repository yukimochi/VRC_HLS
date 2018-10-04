var request = require('supertest');
var app = require('../../app');
const RedisEngine = require('../../classes/redis_engine');

const demo_playlists = [{
    "metadate": {
        "title": "used_title",
        "author": "used_author",
        "m3u8": "https://localhost.localhost/used_m3u8.m3u8",
        "thumbs": "https://localhost.localhost/used_thumb.jpg",
        "lvid": "lv012345678",
        "platform": "YouTube Live",
        "provider": "YouTube"
    },
    "timestamp": new Date()
}];

before('Initialize Redis.', function () {
    var redis = new RedisEngine();
    redis.regist_playlist('api_test', demo_playlists, () => {
            redis.dispose();
    });
});

describe('/api/list', function () {
    it('lack of instance key', function (done) {
        request(app)
            .get('/api/list')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(502, done);
    });
    it('valid request', function (done) {
        request(app)
            .get('/api/list?instance=unused')
            .expect('Access-Control-Allow-Origin', '*')
            .expect('Access-Control-Allow-Methods', 'GET')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200, done);
    });
});

describe('/api/direct', function () {
    it('lack of query', function (done) {
        request(app)
            .get('/api/direct')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(502, done);
    });
    it('lack of id', function (done) {
        request(app)
            .get('/api/direct?instance=foo')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(502, done);
    });
    it('lack of instance', function (done) {
        request(app)
            .get('/api/direct?id=0')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(502, done);
    });
    it('valid request w/ unused_key', function (done) {
        request(app)
            .get('/api/direct?instance=unused_key&id=0')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(502, done);
    });
    it('valid request w/ used_key', function (done) {
        request(app)
            .get('/api/direct?instance=api_test&id=0')
            .expect('Location', 'https://localhost.localhost/used_m3u8.m3u8')
            .expect(302, done);
    });
});

describe('/api/live', function () {
    it('lack of query', function (done) {
        request(app)
            .get('/api/live')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(502, done);
    });
    it('lack of id', function (done) {
        request(app)
            .get('/api/live?instance=foo')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(502, done);
    });
    it('lack of instance', function (done) {
        request(app)
            .get('/api/live?id=0')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(502, done);
    });
    it('valid request w/ unused_key', function (done) {
        request(app)
            .get('/api/live?instance=unused_key&id=0')
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(502, done);
    });
    it('valid request w/ used_key', function (done) {
        request(app)
            .get('/api/live?instance=api_test&id=0')
            .expect('Location', '../static/player.html?src=https%3A%2F%2Flocalhost.localhost%2Fused_m3u8.m3u8&instance=api_test')
            .expect(302, done);
    });
});
