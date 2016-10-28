var express = require('express');
var router = express.Router();
var controllerUsers = require('../controllers/users')
var controllerTransactions = require('../controllers/transactions')
var passport = require('passport')

/* GET home page. */
router.get('/', function(req, res) {
    res.render('dashboard/index', {  });
});


router.get('/profile')


router.get('/transaction', function (req, res) {
    res.render('dashboard/transaction')
})

module.exports = router;
