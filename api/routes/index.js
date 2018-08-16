var express = require('express');
var fs = require('fs');
var router = express.Router();

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/newsSearch/:keyword', function (req, res) {
    client.search({
        q: req.params.keyword
    }).then(function (body) {
        var hits = body.hits.hits;
        res.json(hits);
    }, function (error) {
        console.trace(error.message);
    });
});

router.get('/user', function (req, res) {
    var value = {"test": "user"};
    console.log(value);
    res.json(value);
});


module.exports = router;
