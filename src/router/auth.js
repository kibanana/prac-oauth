const express = require('express')
const passport = require('passport')

const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/fail' }), (req, res) => {
    res.redirect('/auth/succeed')
})

router.get('/succeed', (req, res) => {
    if (!req.user) return res.status(401).send('Unauthorized!')
    res.send(JSON.stringify(req.user, null, 4))
})

router.get('/fail', (req, res) => {
    res.send('Fail!')
})

router.get('/test', (req, res) => {})

router.get('/test/google/callback', (req, res) => {})

module.exports = router