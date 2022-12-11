const router = require('express').Router();
const { createUser, authUser } = require('../controllers/user.controller');
const { requireLogin } = require('../middlewares/middleware');
const { validateSignupRequest, validateLoginRequest, isRequestValidated } = require('../validators/auth');

router.post('/login', validateLoginRequest, isRequestValidated, authUser);
router.post('/register', validateSignupRequest, isRequestValidated, createUser);
router.post('/profile', requireLogin, (req, res) => {
    res.status(200).json({ user: 'profile' });
});

module.exports = router;