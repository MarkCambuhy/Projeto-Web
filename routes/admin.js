var User = require('../models/Users');

var express = require('express');
var router = express.Router();
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/uploads');
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	}
});
const upload = multer({storage: storage});
var { verifyToken, verifyTokenAndAdmin } = require('./verifyToken');

router.get('/', verifyTokenAndAdmin, (req, res) => {
    res.render('admin');
});

router.post('/upload', upload.single('arquivo'), (req, res) => {
    res.redirect('../admin');
});

router.post('/posts', async (req, res) => {
    let {title, comment} = req.body;
	try {
		await User.insertPost(title, comment);
		res.redirect('../admin');
	} catch (error) {
        res.status(500).json(error);
	}
});

module.exports = router;

