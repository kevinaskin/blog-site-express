/**
 * Created by Kevinaskin on 2016/9/22.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('about', {title: 'Kevinaskin.top'});
});
// POST
router.post('/post', function (req, res, next) {
    console.log(req.body);
    req.models.msgwall.create({
        username: req.body.username,
        text: req.body.text
    }, function (err, items) {
        if (!err) {
            res.json({code: 0, msg: 'Post msgwall success'});
        } else {
            res.json({code: 1, msg: 'Something wrong anyway', err: err});
        }
    })
});
router.get('/getmsg', function (req, res, next) {
    req.models.msgwall.find({},function (err, item) {
        if(item.length){
            res.json(item);
        }
    });
});
module.exports = router;
