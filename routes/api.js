var express = require('express');
var redis = require('./redis_engine');
var router = express.Router();

router.get('/list', function (req, res, next) {
  if (req.query.instance) {
    redis.query_playlist(req.query.instance, (err, playlists) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET');
      res.header('Content-Type', 'application/json; charset=utf-8');
      res.send(playlists);
    })
  } else {
    res.status(502);
    res.render('error', { "message": "Specify instance key." });
  }
});

router.get('/direct', function (req, res, next) {
  if (req.query.instance && req.query.id) {
    var num = Number(req.query.id);
    redis.query_playlist(req.query.instance, (err, playlists) => {
      if (playlists.length > num) {
        res.redirect(playlists[num].metadate.m3u8);
      } else {
        res.status(502);
        res.render('error', { "message": "Program id is out of range." });
      }
    })
  } else {
    res.status(502);
    res.render('error', { "message": "Specify instance key and program id." });
  }
});

router.get('/live', function (req, res, next) {
  if (req.query.instance && req.query.id) {
    var num = Number(req.query.id);
    redis.query_playlist(req.query.instance, (err, playlists) => {
      if (playlists.length > num) {
        res.redirect("../static/player.html?src=" + encodeURIComponent(playlists[num].metadate.m3u8) + "&instance=" + req.query.instance);
      } else {
        res.status(502);
        res.render('error', { "message": "Program id is out of range." });
      }
    });
  } else {
    res.status(502);
    res.render('error', { "message": "Specify instance key and program id." });
  }
});

module.exports = router;
