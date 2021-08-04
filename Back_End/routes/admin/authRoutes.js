const { json } = require("body-parser");
const express = require("express");
const router = express.Router();
const { requireSignin } = require("../../common-Middlewares/index");
const authController = require("../../controlers/admin/auth");
const auth = require("../../validator/auth");

router.post(
  "/admin/signup",
  auth.validateSignupRequest,
  auth.isRequestValidated, 
  authController.signup
);
router.post(
  "/admin/signin",
  auth.validateAdminRequest,
  auth.isRequestValidated,
  authController.signin
);

router.post(
  "/admin/signout",
  //  requireSignin,
  authController.signout
);
module.exports = router;
