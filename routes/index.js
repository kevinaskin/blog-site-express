var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Kevinaskin.top'});
});
router.get('/personal', function (req, res, next) {
    if (req.session.currentUser && req.session.currentUser !=="") {
        res.render('personal', {title: req.session.currentUser})
    } else {
        res.redirect('/');
    }

});
module.exports = router;
