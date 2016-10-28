var passport = require('passport')
var User = require('../models/users')


function localRegister(req, res, next) {
    User.register(new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email
    }), req.body.password, function(err) {
        if (err) {
            return res.render('login', {})
        }

        console.log('user registered!');
        passport.authenticate('local')(req, res, function() {
            console.log("..............", req.session)
            req.session.save(function(err) {
                    if (err) {
                        return next(err)
                    }
                    res.redirect('dashboard/profile')
                })
                // res.redirect('dashboard/profile')
        })
    })
}


function viewProfile(req, res) {
    res.render('dashboard/profile', { profile: req.user })
}

function isAuthenticate(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}

function isLogin(req, res, next) {
    if (req.isAuthenticated())
        res.redirect('/profile');

    return next();
}

function logout(req, res) {
    req.session.destroy()
    res.redirect('/')
}

function localLogin(req, res) {
    res.redirect('dashboard/profile')
}

function viewFormTransaction(req, res) {
    res.render('dashboard/transaction', { username: req.user.username })
}

function insertTransaction(req, res) {

    User.findOneAndUpdate({
            username: req.user.username
        }, {
            $push: {
                transaction: {
                    date: new Date(req.body.date).toISOString(),
                    cost: Number(req.body.cost),
                    category: req.body.type,
                    description: req.body.description,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            }
        }, {
            new: true,
            safe: true,
            upsert: true
        },
        function(err, data) {
            if (err) console.log(err)
            console.log(data)
            res.redirect('/dashboard')
        })

}

function viewReport(req, res) {

    User.FindAll({}, function(data) {
        res.render('dashboard/report')
    })
}

function viewEditProfile(req, res) {
    res.render('dashboard/editProfile', { profile: req.user })
}

function editProfile(req, res) {
    res.send(req.body)

}


module.exports = {
    viewProfile: viewProfile,
    localRegister: localRegister,
    isAuthenticate: isAuthenticate,
    isLogin: isLogin,
    logout: logout,
    localLogin: localLogin,
    viewFormTransaction: viewFormTransaction,
    insertTransaction: insertTransaction,
    viewReport: viewReport,
    viewEditProfile: viewEditProfile,
    editProfile: editProfile
}