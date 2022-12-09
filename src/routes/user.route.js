const router = require('express').Router();
const { createUser, authUser, requireLogin } = require('../controllers/user.controller');

router.post('/admin/login', authUser);
router.post('/admin/register', createUser);
router.post('/profile', requireLogin, (req, res) => {
    res.status(200).json({ user: 'profile' });
});

module.exports = router;