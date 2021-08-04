const express = require("express");
const { initialData } = require("../../controlers/admin/initialData");
const router = express.Router();
const {
  requireSignin,
  adminMiddleware,
} = require("../../common-Middlewares/index");

router.get("/initialData", initialData);

module.exports = router;
