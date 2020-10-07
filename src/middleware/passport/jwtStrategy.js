const { Strategy, ExtractJwt } = require('passport-jwt')
const userDB = require('../../models/user')

module.exports = new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
    issuer: process.env.JWT_ISSUER
}, async (payload, done) => {
    try {
        if (await userDB.IsExistsById({ _id: payload._id })) done(null, false)
        else done(null, { _id: payload._id })
    }
    catch (err) {
        done(null, { error: err })
    }
})