var express = require('express');
var router = express.Router();
var UserController = require('../controllers/users')
var controllerTransactions = require('../controllers/transactions')
var passport = require('passport')

/* GET home page. */
router.get('/', function(req, res) {
    res.render('dashboard/index', {  });
});


router.get('/profile', UserController.isAuthenticate, UserController.viewProfile)

router.get('/profile/edit', UserController.isAuthenticate, UserController.viewEditProfile)
router.post('/profile/edit', UserController.isAuthenticate, UserController.editProfile)




router.get('/transaction', function (req, res) {
    res.render('dashboard/transaction')
})

module.exports = router;
