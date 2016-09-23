/**
 * Created by Kevinaskin on 2016/9/21.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    if(req.session.currentUser == 'kevinaskin'){
        res.render('admin',{title:'Welcome Kevinaskin'});
    }else{
        res.redirect('/');
    }

});


module.exports = router;
