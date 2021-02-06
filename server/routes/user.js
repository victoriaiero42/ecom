const express = require('express');

const router = express.Router();

const { authCheck } = require('../middlewares/auth');

const { userCart } = require('../controllers/user');

router.post('/user/cart', authCheck, userCart);


module.exports = router;