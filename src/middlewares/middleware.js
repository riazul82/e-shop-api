const jwt = require('jsonwebtoken');

const requireLogin = (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        const user = jwt.verify(token, process.env.JWT_SCRT_KEY);
        req.user = user;
    } else {
        return res.status(400).json({ message: 'authorization required!' });
    }
    next();
}

const userMeddleware = (req, res, next) => {

}

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(400).json({ message: 'access denied!' });
    }
    next();
}

module.exports = { requireLogin, userMeddleware, adminMiddleware };