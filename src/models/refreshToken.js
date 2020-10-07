const { connection } = require('mongoose')
const { ObjectId } = require('mongodb')
const refreshTokenColl = connection.collection('refresh_token')

exports.Create = (params = {}) => {
    const { userId, refreshToken } = params

    const currentDate = new Date()

    return refreshTokenColl.updateOne({
        userId: new ObjectId(userId),
    }, {
        $set: {
            refreshToken,
            lastUpdated: new Date(),
            expiresAt: new Date(currentDate.setDate(currentDate.getDate() + 10))
        }
    }, {
        upsert: true
    })
}

exports.Delete = (params = {}) => {
    const { userId } = params
    
    return refreshTokenColl.deleteOne({ userId: new ObjectId(userId) })
}