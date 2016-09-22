/**
 * Created by Kevinaskin on 2016/9/20.
 */
var express = require('express');
var router = express.Router();

/* POST */
//login
router.post('/', function(req, res, next) {
    req.models.user.find({username:req.body.username},function (err, item) {
        if(item[0]){
            if(item[0].password == req.body.password){
                req.session.currentUser = item[0].username;
                req.session.currentState = item[0].state;
                if(item[0].username == 'kevinaskin'){
                    res.json({code:-1,msg:'Welcome back Kevinaskin'});
                }else{
                    res.json({code:1,msg:'Login success'});

                }

            }else{
                res.json({code:2,msg:'Wrong Password'});
            }
        }else{
            res.json({code:0,msg:'No such User registed'});
        }
    })
});
//regist
router.post('/regist', function(req, res, next) {
    req.models.user.create({
        username:req.body.username,
        password:req.body.password,
        state:1
    },function (err, items) {
        if(!err){
            res.json({code:3,msg:'registed success'})
        }else{
            if(err.errno == 1062){
                res.json({code:4,msg:'This name has been registed',err:err});
            }else{
                res.json({code:5,msg:'Something wrong anyway',err:err});
            }
        }
    })
});
//logout
router.post('/logout', function(req, res, next) {
    req.session.currentUser='';
    res.json({code:0,msg:'logout'});
});
module.exports = router;
