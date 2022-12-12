var express = require('express');
const Users = require('../models/Users');
var router = express.Router();

/* GET home page. */
router.get('/login', function (req, res, next) {
    res.render('login');
});
router.post('/login', function (req, res, next) {
    let user = Users.findEmail(req.body.email);
    const hashedPassord = CryptoJS.AES.decrypt(user.password, 'secreto');
    const passwordOriginal = hashedPassord.toString(CryptoJS.enc.Utf8);
    if (!Users.findEmail(email) && passwordOriginal == req.body.password) {
        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, 'secreto', { expiresIn: '3d' });
        res.json({ token: token });
    }
});

module.exports = router;

