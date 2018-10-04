const RedisEngine = require('../classes/redis_engine');

demo_playlists = [{
    "metadate": {
        "title": "used_title",
        "author": "used_author",
        "m3u8": "https://localhost.localhost/used_m3u8.m3u8",
        "thumbs": "https://localhost.localhost/used_thumb.jpg",
        "lvid": "lv012345678",
        "platform": "YouTube Live",
        "provider": "YouTube",
        "timestamp": new Date()
    }
}];

var redis = new RedisEngine();

redis.regist_playlist('used_key', demo_playlists, () => {
    redis.query_playlist('used_key', (_, data) => {
        console.log(data);
        console.log('demo_playlists written.');
        redis.dispose();
    });
});
