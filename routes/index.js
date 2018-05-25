var express = require('express');
var engine = require('./m3u8_engine');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res, next) {
  var data = req.body;
  if (data.instance && data.ls_url) {
    engine(data.ls_url, (pre) => {
      if (pre) {
        res.render('confirm', { instance: data.instance, ls_url: data.ls_url, preview: pre });
      } else {
        res.status(404);
        res.render('error', { "message": "Requested resource is forbidden." });
      }
    })
  } else {
    res.status(400);
    res.render('error', { "message": "Please fill forms." });
  }
});

module.exports = router;
