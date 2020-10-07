const express = require('express')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const refreshTokenDB = require('../../models/refreshToken')

const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/fail' }), (req, res) => {
    res.redirect('/auth/sign-in')
})

router.get('/succeed', (req, res) => {
    try {
        if (!req.user) return res.status(401).send('Unauthorized!')
        res.send(JSON.stringify(req.user, null, 4))
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Fail!')
    }
})

router.get('/fail', (req, res) => {
    try {
        res.status(400).send('Fail!')
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Fail!')
    }
})

router.get('/sign-in', (req, res) => {
    try {
        if (!req.user) return res.status(401).send('Unauthorized!')

        const { _id } = req.user
    
        const token = jwt.sign({ _id }, process.env.JWT_SECRET)
        const refreshToken = jwt.sign({ _id }, process.env.JWT_REFRESH_SECRET)
        
        refreshTokenDB.Create({ userId: _id, refreshToken })
    
        res.send({ token })
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Fail!')
    }
})

router.get('/access-verify', passport.authenticate('jwt', { failureRedirect: '/auth/fail' }), (req, res) => {
    try {
        res.send('Succeed!')
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Fail!')
    }
})

router.get('/refresh-access', (req, res) => {
    try {
        const { token } = req.query

        if (!token) res.status(400).send('ERR_INVALID_PARAM')
    
        const decodedToken = jwt.decode(token)
        if (!decodedToken.hasOwnProperty('_id') || decodedToken._id.length !== 24) res.status(400).send('ERR_INVALID_PARAM')
    
        const { _id } = decodedToken
    
        const newToken = jwt.sign({ _id }, process.env.JWT_SECRET)
    
        res.send({ token: newToken })
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Fail!')
    }
})

router.delete('/sign-out', passport.authenticate('jwt', { failureRedirect: '/auth/fail' }), (req, res) => {
    try {
        const { _id } = req.user

        refreshTokenDB.Delete({ userId: _id })

        res.send('Succeed!')
    }
    catch (err) {
        console.log(err)
        res.status(500).send('Fail!')
    }
})

module.exports = router