const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies['accessToken'];
    if (!accessToken) return res.send('User not authenticated!');
    try {
        const tokenValido = jwt.verify(accessToken, 'chave');
        if (tokenValido) {
            req.authenticated = true;
            return next();
        }
    } catch (error) {
        return res.status(400).json({ error: error });
    }
};
const verifyTokenAndAdmin = (req, res, next) => {
    const accessToken = req.cookies['accessToken'];
    if (!accessToken) return res.send('User not authenticated!');
    try {
        const tokenValido = jwt.verify(accessToken, 'chave');
        if (tokenValido && tokenValido.isAdmin == true) {
            req.authenticated = true;
            return next();
        } else {
            res.redirect('home');
        }
    } catch (error) {
        return res.status(400).json({ error: error });
    }
};

module.exports = { verifyToken, verifyTokenAndAdmin };