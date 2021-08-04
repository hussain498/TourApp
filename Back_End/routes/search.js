const express = require("express");
const router = express.Router();
const {SearchController} = require('../controlers/search')
// const {
//   requireSignin,
//   adminMiddleware,
// } = require("../../common-Middlewares/index");

router.post("/search",SearchController);

module.exports = router;
