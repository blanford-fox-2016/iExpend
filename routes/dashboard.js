var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('dashboard/index', {  });
});

router.get('/transaction', function (req, res) {
    res.render('dashboard/transaction')
})
module.exports = router;
