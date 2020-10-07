const { connection } = require('mongoose')
const { ObjectId } = require('mongodb')
const refreshTokenColl = connection.collection('refresh_token')

exports.Create = (params = {}) => {
    const { userId, refreshToken } = params

    return refreshTokenColl.updateOne({
       userId: new ObjectId(userId),
    }, {
       userId: new ObjectId(userId),
       refreshToken,
       lastUpdated: new Date(),
       expiresAt: new Date() 
    }, {
        upsert: true
    })
}

exports.Delete = (params = {}) => {
    const { userId } = params
    
    return refreshTokenColl.deleteOne({ userId: new ObjectId(userId) })
}