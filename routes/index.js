var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if(req.session.currentUser){
        res.render('index', {title: 'Kevinaskin.top',regist:'regist',registdisplay:'none',login:req.session.currentUser,logindisplay:'none',usernamedisplay:'block',logoutdisplay:'block'});
    }else{
        res.render('index', {title: 'Kevinaskin.top',regist:'regist',registdisplay:'block',login:'login',logindisplay:'block',logoutdisplay:'none',usernamedisplay:'none'});
    }

});
router.get('/personal', function (req, res, next) {
    if (req.session.currentUser && req.session.currentUser !=="") {
        res.render('personal', {title: req.session.currentUser})
    } else {
        res.redirect('/');
    }

});
module.exports = router;
