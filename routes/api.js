/**
 * Created by Kevinaskin on 2016/9/24.
 */
var express = require('express');
var router = express.Router();

/* POST */
//DEL-MSG
router.post('/del-msg', function(req, res, next) {
    req.models.msgwall.find({id: req.body.id}).remove(function () {
        res.json({msg:'removed'})
    });

});
//DEL-Article
router.post('/del-article', function(req, res, next) {
    req.models.article.find({id: req.body.id}).remove(function () {
        res.json({msg:'removed'})
    });

});
//ARTICLE-POST
router.post('/article-post', function(req, res, next) {
    req.models.article.create({
        title:req.body.title,
        text:req.body.texts,
        tags:req.body.tagsnumber
    },function (err, items) {
        if(!err){
            res.json({code:0,msg:'upload success'});
        }else{
            res.json({code:1,msg:'upload failed'});
        }
    })

});
//ARTICLE-GET
router.get('/article-get',function (req, res, next) {
    req.models.article.find({},function (err, item) {
        if(item.length){
            res.json(item);
        }
    })
});
//Piece-GET
router.get('/Piece',function (req, res, next) {
    req.models.article.find({tags:0},function (err, item) {
        if(item.length){
            res.json(item);
        }
    })
});
//Blog-GET
router.get('/Blog',function (req, res, next) {
    req.models.article.find({tags:1},function (err, item) {
        if(item.length){
            res.json(item);
        }
    })
});
//Photo-GET
router.get('/Photo',function (req, res, next) {
    req.models.article.find({tags:2},function (err, item) {
        if(item.length){
            res.json(item);
        }
    })
});


module.exports = router;