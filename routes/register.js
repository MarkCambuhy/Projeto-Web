var User = require('../models/Users');

var express = require('express');
var router = express.Router();
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register');
});
router.post('/register', async (req, res) => {
    const username = req.body.username,
        email = req.body.email,
        password = CryptoJS.AES.encrypt(req.body.password, 'secreto').toString();
    try {
        const savedUser = await User.insert(username, email, password);
        res.redirect('login');
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;

