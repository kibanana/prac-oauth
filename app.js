const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()
const passport = require('./src/middleware/passport')
const router = require('./src/router/auth')
const path = require('path')
require('./src/models/connection')

const app = express()

app.use(express.json())
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

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    if (req.originalUrl.includes('//')) res.redirect(req.originalUrl.replace('//', '/'))
    next()    
})

app.set('view engine', 'ejs')
app.use('/', express.static(`${__dirname}/src/public`))
app.set('views', `${__dirname}/src/views`)

app.use('/auth', router)

app.get('*', (req, res) => {
    res.render('index')
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Server works!')
})