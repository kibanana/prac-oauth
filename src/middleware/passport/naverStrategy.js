const NaverStrategy = require('passport-naver').Strategy
const userDB = require('../../models/user')

module.exports = new NaverStrategy({
    clientID: process.env.NAVER_CLIENT_ID,
    clientSecret: process.env.NAVER_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/naver/callback'
}, async (_accessToken, _refreshToken, profile, done) => {
    try {
        const { provider, _json: profileJson } = profile

        const { email, nickname, profile_image } = profileJson

        const params = { type: provider, email: email, firstName: nickname, lastName: nickname, photo: profile_image }
    
        if (await userDB.IsExists({ type: params.type, email: params.email })) await userDB.SignIn(params)
        else await userDB.SignUp(params)

        const user = await userDB.GetItem({ type: params.type, email: params.email })
        
        return done(null, user)
    }
    catch (err) {
        return done(null, { error: err })
    }
})