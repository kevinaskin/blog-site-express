
var express = require('express');
var router = express.Router();


router.get('/blog', function (req, res, next) {
        if(req.session.currentUser){
                res.render('article', {title: 'Blog',regist:'regist',registdisplay:'none',login:req.session.currentUser,logindisplay:'none',usernamedisplay:'block',logoutdisplay:'block'});
        }else{
                res.render('article', {title: 'Blog',regist:'regist',registdisplay:'block',login:'login',logindisplay:'block',logoutdisplay:'none',usernamedisplay:'none'});
        }
});
router.get('/piece', function (req, res, next) {
        if(req.session.currentUser){
                res.render('article', {title: 'Piece',regist:'regist',registdisplay:'none',login:req.session.currentUser,logindisplay:'none',usernamedisplay:'block',logoutdisplay:'block'});
        }else{
                res.render('article', {title: 'Piece',regist:'regist',registdisplay:'block',login:'login',logindisplay:'block',logoutdisplay:'none',usernamedisplay:'none'});
        }
});
router.get('/photo', function (req, res, next) {
        if(req.session.currentUser){
                res.render('article', {title: 'Photo',regist:'regist',registdisplay:'none',login:req.session.currentUser,logindisplay:'none',usernamedisplay:'block',logoutdisplay:'block'});
        }else{
                res.render('article', {title: 'Photo',regist:'regist',registdisplay:'block',login:'login',logindisplay:'block',logoutdisplay:'none',usernamedisplay:'none'});
        }
});

module.exports = router;
