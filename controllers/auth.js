// require express
const express = require('express')
// import router
const router = express.Router()
// import db
const db = require('../models')
// import middleware
const flash = require('flash')
// TODO: update require to passport config file path
const passport

// register get router
router.get('/register', function (req, res) {
    res.render('auth/register')
})
// register post route
router.post('/register', function(req, res) {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }).then(function([user, created]) {
        // if user was created
        if (created) {
            // authenticate user and start authorization process
            console.log('user created 👑')
            res.redirect('/')
        } else {
            // if user already exists
            console.log('user email already exists 🙈')
            // send error to user that email already exists
            req.flash('error', 'Error: email already exists for user. Try again.')
            // redirect back to register get route
            res.redirect('auth/register')
        }
    }).catch(function(err) {
        console.log(`error found. \nmessage: ${err.message}. \nplease review- ${err}`)
        req.flash('error', err.message)
        res.redirect('/auth/register')
    })
})

//login get route
router.get('/login', function(req, res) {
    res.render('auth/login')
})

// login post route
// TODO: add next param to function
router.post('/login', function(req, res) {
    passport.authenticate(local, function(err, user, info) {
        // if no user authenticated
        if (!user) {
            req.flash('error', 'invalid username or password')
            // save to our user session no username
            // redirect our user to try logging in again
        }
        if (error) {
            // TODO: add next param from function
            return error
        }
        req.login(function(user, error) {
            // if error move to error
            // if success flash success message
            // if sucess save session and redirect user
        })
    })
})

router.post('login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    successFlash: 'welcome to our app',
    failureFlash: 'invalid username or password'
}))

// export router
module.exports = router;