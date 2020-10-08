const passport = require('passport')
const JwtStrategy = require('./jwtStrategy')
const GoogleStrategy = require('./googleStrategy')
const NaverStrategy = require('./naverStrategy')
const KakaoStrategy = require('./kakaoStrategy')
const FacebookStrategy = require('./facebookStrategy')

passport.use('jwt', JwtStrategy)
passport.use('google', GoogleStrategy)
passport.use('naver', NaverStrategy)
passport.use('kakao', KakaoStrategy)
passport.use('facebook', FacebookStrategy)

passport.serializeUser(function(user, done) {
    done(null, user);
})

passport.deserializeUser(function(user, done) {
    done(null, user);
})

module.exports = passport