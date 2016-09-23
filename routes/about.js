/**
 * Created by Kevinaskin on 2016/9/22.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if(req.session.currentUser){
        res.render('about', {title: 'Kevinaskin.top',regist:'regist',registdisplay:'none',login:req.session.currentUser,logindisplay:'none',usernamedisplay:'block',logoutdisplay:'block'});
    }else{
        res.render('about', {title: 'Kevinaskin.top',regist:'regist',registdisplay:'block',login:'login',logindisplay:'block',logoutdisplay:'none',usernamedisplay:'none'});
    }
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
