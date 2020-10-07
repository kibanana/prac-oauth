const passport = require('passport')
const JwtStrategy = require('./jwtStrategy')
const GoogleStrategy = require('./googleStrategy')

passport.use('jwt', JwtStrategy)
passport.use('google', GoogleStrategy)

passport.serializeUser(function(user, done) {
    done(null, user);
})

passport.deserializeUser(function(user, done) {
    done(null, user);
})

module.exports = passport