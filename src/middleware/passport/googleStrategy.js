const GoogleStrategy = require('passport-google-oauth20').Strategy
const userDB = require('../../models/user')

module.exports = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        const { provider, _json: profileJson } = profile
        const { name: fullName, given_name: givenName, family_name: familyName, picture, email } = profileJson

        const params = { type: provider, email: email, fullName, firstName: givenName, lastName: familyName, photo: picture }
    
        if (await userDB.IsExists({ type: params.type, email: params.email })) await userDB.SignIn(params)
        else await userDB.SignUp(params)

        const user = await userDB.GetItem({ type: params.type, email: params.email })
        
        return done(null, user)
    }
    catch (err) {
        return done(null, { error: err })
    }
})