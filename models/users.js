var mongoose = require('mongoose')

var passportLocalMongoose = require('passport-local-mongoose')

var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    username: String,
    email: String
})

userSchema.plugin(passportLocalMongoose)

var User = mongoose.model('users', userSchema)

module.exports = User