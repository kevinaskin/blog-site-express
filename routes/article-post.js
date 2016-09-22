/**
 * Created by Kevinaskin on 2016/9/21.
 */
var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
    console.log(req.body);
    res.render('admin',{title:'admin'});
});


module.exports = router;
