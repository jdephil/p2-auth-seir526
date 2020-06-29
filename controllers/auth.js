// require express
const express = require('express')
// import router
const router = express.Router()
// import db
const db = require('../models')
// import middleware

// register get routee
router.get('/register', function (req, res) {
    res.render('auth/register')
})

//l ogin get route
router.get('login', function(req, res) {
    res.render('auth/login')
})

// login post route