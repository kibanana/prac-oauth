const { connection } = require('mongoose')
const { ObjectId } = require('mongodb')
const userColl = connection.collection('users')

exports.GetItem = (params = {}) => {
    const { type, email } = params

    return userColl.findOne({ type, email })
}

exports.IsExists = async (params = {}) => {
    const { type, email } = params

    return (await userColl.countDocuments({ type, email })) > 0
}

exports.IsExistsById = async (params = {}) => {
    const { _id } = params

    return (await userColl.countDocuments({ _id: new ObjectId(_id) }) > 0)
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