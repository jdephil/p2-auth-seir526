// --- Required NPM libraries
// configure dotenv
require('dotenv').config()
// require express & set up express app instance
const Express = require('express')
// require and set view engine use ejs
const ejsLayouts = require('express-ejs-layouts')
// require all middleware for app/authentication
// helmet, morgan, passport, and custom middleware,
// express-sessions, sequelize sessions, flash
const helmet = require('helmet')
const session = require('express-session')
const flash = require('flash')


// --- App Setup
const app = Express()
// set app to use false urlencoding 
app.use(Express.urlencoded({ extended: false }))
// set app public directory for use
app.use(Express.static(__dirname + 'public'))
// set app ejsLayouts for render
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(require('morgan')('dev'))
app.use(helmet())

// --- Routes
app.get('/', (req, res) => {
    // check to see if user logged in
    res.render('index')

})

// include auth controller
app.use('/auth', require('./controllers/auth'))

// initialize App on Port
app.listen(process.env.PORT || 3000, function() {
    console.log(`🍃vibing with ${process.env.PORT}`)
})
