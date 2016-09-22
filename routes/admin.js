/**
 * Created by Kevinaskin on 2016/9/21.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/to', function (req, res, next) {
    res.render('admin',{title:'Welcome Kevinaskin'});
});
router.get('/', function (req, res, next) {
    res.redirect('/utf8-php/admin.html');
});

module.exports = router;
