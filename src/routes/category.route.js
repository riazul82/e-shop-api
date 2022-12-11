const router = require('express').Router();
const { requireLogin, adminMiddleware } = require('../middlewares/middleware');
const { createCategory, getCategories } = require('../controllers/category.controller');

router.get('/catogory/get', getCategories);
router.post('/category/create', requireLogin, adminMiddleware,  createCategory);

module.exports = router;