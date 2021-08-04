const express = require('express');
const { requireSignin, userMiddleware } = require('../common-Middlewares');
const { addAddress, getAddress } = require('../controlers/address');
const router = express.Router();


router.post('/user/address/create', requireSignin, userMiddleware, addAddress);
router.post('/user/getaddress', requireSignin, userMiddleware, getAddress);

module.exports = router;