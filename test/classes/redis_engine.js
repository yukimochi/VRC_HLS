var assert = require('assert');
var RedisEngine = require('../../classes/redis_engine');

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
    redis.db.flushdb();
    redis.dispose();
});

describe('regist_playlist', function () {
    it('3600 * 8 expires', function (done) {
        var redis = new RedisEngine();
        redis.regist_playlist('regist_playlist', demo_playlists, () => {
            redis.db.ttl("regist_playlist", (_, ttl) => {
                assert.equal(ttl > 3600 * 8 - 120, true);
                redis.dispose();
                done();
            })
        });
    });
});

describe('query_playlist', function () {
    it('3600 * 8 expires', function (done) {
        var redis = new RedisEngine();
        redis.regist_playlist('query_playlist', demo_playlists, () => {
            redis.query_playlist('query_playlist', (_, data) => {
                assert.equal(JSON.stringify(data), JSON.stringify(demo_playlists));
                redis.dispose();
                done();
            });
        });
    });
});
