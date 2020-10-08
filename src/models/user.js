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
    const { type, email, fullName, firstName, lastName, photo } = params // 이름, 성

    if (fullName) {
        delete firstName
        delete lastName
    }
    else delete fullName

    const currentDate = new Date().toISOString()
    params['createdAt'] = currentDate
    params['lastLoginDate'] = currentDate

    return userColl.insertOne(params)
}

exports.SignIn = (params = {}) => {
    const { type, email, fullName, firstName, lastName, photo } = params
    
    const updateQuery = { photo, lastLoginDate: new Date().toISOString() }
    
    if (fullName) updateQuery['fullName'] = fullName
    else {
        updateQuery['firstName'] = firstName
        updateQuery['lastName'] = lastName
    }

    return userColl.updateOne({ type, email }, { $set: updateQuery })
}