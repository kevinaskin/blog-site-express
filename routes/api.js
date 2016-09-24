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

module.exports = router;