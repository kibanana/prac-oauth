const FacebookStrategy = require('passport-facebook').Strategy

module.exports = new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone',
      'updated_time', 'verified', 'displayName']
  }, function (accessToken, refreshToken, profile, done) {
    console.log(profile)
  }
)