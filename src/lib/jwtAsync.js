const jwt = require('jsonwebtoken')

exports.issueAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h', issuer: process.env.JWT_ISSUER },
            (err, token) => {
                if (err) reject(err)
                else resolve(token)
            }
        )
    })
}

exports.issueRefreshToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '14d', issuer: process.env.JWT_ISSUER },
            (err, token) => {
                if (err) reject(err)
                else resolve(token)
            }
        )
    })
}