var redis = require('redis');
var db = redis.createClient(process.env.REDIS_URL || '//redis:6379');

exports.query_playlist = function (instance, callback) {
    db.get(instance, (err, data) => {
        if (!err) {
            var playlists = [];
            if (data != null) {
                playlists = JSON.parse(data);
                playlists.forEach(playlist => {
                    playlist.timestamp = new Date(playlist.timestamp);
                });
            } else {
                console.log('Not playlist exist : ' + instance);
            }
            callback(null, playlists)
        } else {
            callback(err, null);
        }
    });
}

exports.regist_playlist = function (instance, data, callback) {
    db.set(instance, JSON.stringify(data), (err, res) => {
        db.expire(instance, 3600 * 8);
        if (!err) {
            callback(null)
        } else {
            callback(err);
        }
    });
}
