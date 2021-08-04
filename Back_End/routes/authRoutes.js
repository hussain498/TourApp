const express = require("express");
const router = express.Router();
const authController = require("../controlers/auth");
const auth = require("../validator/auth");

router.post(
  "/signup", 
  auth.validateSignupRequest,
  auth.isRequestValidated,
  authController.signup,
  
);
router.post(
  "/signin",
  auth.validateAdminRequest,
  auth.isRequestValidated,
  authController.signin
); 


module.exports = router;
 