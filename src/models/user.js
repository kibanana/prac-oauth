const { connection } = require('mongoose')
const userColl = connection.collection('users')

exports.IsExistsUser = async (params = {}) => {
    const { type, email } = params

    return (await userColl.countDocuments({ type, email })) > 0
}

exports.SignUp = (params = {}) => {
    const { type, email, firstName, lastName, photo } = params // 이름, 성

    return userColl.insertOne({ type, email, firstName, lastName, photo, createdAt: new Date().toISOString(), lastLoginDate: new Date().toISOString() })
}

exports.SignIn = (params = {}) => {
    const { type, email, firstName, lastName, photo } = params
    
    return userColl.updateOne(
        { type, email },
        { $set: { firstName, lastName, photo, lastLoginDate: new Date().toISOString() } }
    )
}