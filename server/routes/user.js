const express = require('express');

const router = express.Router();

const { authCheck } = require('../middlewares/auth');

const { userCart } = require('../middlewares/user');

router.post('/cart', authCheck, userCart);


module.exports = router;