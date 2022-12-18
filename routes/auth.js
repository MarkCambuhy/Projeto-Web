var User = require('../models/Users');

var express = require('express');
const Users = require('../models/Users');
var router = express.Router();
var jwt = require('jsonwebtoken');

var cookieParser = require('cookie-parser');
router.use(cookieParser());

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let user = await User.find(email);
    if(!user){
        return res.render('login', {msnErr: 'Email inválido!'});
    }
    if (user.email == email && user.password == password) {
        let token = jwt.sign({
            _id: user._id,
            login: user.username,
            isAdmin: user.isAdmin
        }, 'chave');
        res.cookie('accessToken', token,{
            maxAge: 60*60*24*30*1000,
        });
        res.redirect('../home');
    } else {
        res.render('login', {msnPass: 'Senha inválida!'});
    }
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    let { username, email, password, repeatpass } = req.body;
    let auxpass = '' + password;
    if(await User.find(email)){
        return res.render('register', { errEmail : 'Email já cadastrado!' });
    } else if(auxpass.length < 8) {
        return res.render('register', { errPass : 'Senha muito curta!' });
    } else if( password != repeatpass) {
        return res.render('register', { errPass : 'As senhas devem ser iguais!' });
    }
    try {
        await User.insert(username, email, password);
        res.redirect('./login');
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;