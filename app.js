const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()
const passport = require('./src/middleware/passport')
const router = require('./src/router/auth')
require('./src/models/connection')

const app = express()

app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 24000 * 60 * 60,
    }
}))
app.use(cookieParser())

app.use('/', express.static('src/public'))

app.use('/auth', router)

app.get('*', (req, res) => {
    res.redirect('/index.html')
});

app.listen(3000, () => {
    console.log('Server works!')
})