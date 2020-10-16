const FacebookStrategy = require('passport-facebook').Strategy
const userDB = require('../../models/user')

module.exports = new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/facebook/callback`,
    profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone',
      'updated_time', 'verified', 'displayName']
  }, async function (_accessToken, _refreshToken, profile, done) {
    try {
      const { id, provider, _json: profileJson } = profile
      const { name: fullName, last_name: lastName, first_name: firstName } = profileJson

      const params = { id, type: provider, fullName, firstName, lastName }
  
      if (await userDB.IsExists({ type: params.type, id: params.id })) await userDB.SignIn(params)
      else await userDB.SignUp(params)

      const user = await userDB.GetItem({ type: params.type, id: params.type })
      
      return done(null, user)
    }
    catch (err) {
        return done(null, { error: err })
    }
  }
)