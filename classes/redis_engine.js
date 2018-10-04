const redis = require('redis');

module.exports = class RedisEngine {
    constructor() {
        this.db = redis.createClient(process.env.REDIS_URL || '//redis:6379');
    }

    query_playlist(instance, callback) {
        this.db.get(instance, (err, data) => {
            if (!err) {
                var playlists = [];
                if (data != null) {
                    playlists = JSON.parse(data);
                    playlists.forEach(playlist => {
                        playlist.timestamp = new Date(playlist.timestamp);
                    });
                } else {
                    console.log('playlist not exists : ' + instance);
                }
                callback(null, playlists)
            } else {
                callback(err, null);
            }
        });
    };

    regist_playlist(instance, data, callback) {
        this.db.set(instance, JSON.stringify(data), (err, res) => {
            this.db.expire(instance, 3600 * 8);
            if (!err) {
                callback(null)
            } else {
                callback(err);
            }
        });
    }

    dispose() {
        this.db.quit();
    }
}
