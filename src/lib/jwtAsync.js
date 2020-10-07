const jwt = require('jsonwebtoken')

exports.issueAccessToken = (_id) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { _id },
            config.JWT_SECRET,
            { expiresIn: '1h', issuer: process.env.JWT_ISSUER },
            (err, token) => {
                if (err) reject(err)
                else resolve(token)
            }
        )
    })
}

exports.issueRefreshToken = (_id) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            { _id },
            config.JWT_REFRESH_SECRET,
            { expiresIn: '14d', issuer: process.env.JWT_ISSUER },
            (err, token) => {
                if (err) reject(err)
                else resolve(token)
            }
        )
    })
}
