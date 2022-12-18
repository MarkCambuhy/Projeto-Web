var express = require('express'),
    router = express.Router();
const Users = require('../models/Users');
var { verifyToken, verifyTokenAndAdmin } = require('./verifyToken');

router.get('/', verifyToken, async (req, res) => {
    let busca = req.query.buscarpost;
    let posts = await Users.findPosts(busca);
    res.render('busca', { posts : posts });
});

router.get('/', async (req, res) => {
    let busca = req.query.buscarpost;
    let posts = await Users.findPosts(busca);
    res.render('busca', { posts : posts });
});

module.exports = router;