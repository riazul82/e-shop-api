const router = require('express').Router();
const { createUser, authUser } = require('../../controllers/admin/user.controller');

router.post('/login', authUser);
router.post('/register', createUser);
// router.post('/profile', requireLogin, (req, res) => {
//     res.status(200).json({ user: 'profile' });
// });

module.exports = router;