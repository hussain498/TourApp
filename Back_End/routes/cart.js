const express = require("express");
const router = express.Router();
const cartController = require("../controlers/cart");
const common_midddleware = require("../common-Middlewares/index");


router.post(
  "/user/cart/addtocart",
  common_midddleware.requireSignin,
  common_midddleware.userMiddleware,
  cartController.addItemToCart
);
// router.get("/category/getCatagory", categoryController.getCategories);
router.get(
  "/user/getCartItems",
  common_midddleware.requireSignin,
  common_midddleware.userMiddleware,
  cartController.getCartItems
);
router.post(
  "/user/cart/removeItem",
  common_midddleware.requireSignin,
  common_midddleware.userMiddleware,
  cartController.removeCartItems
);


module.exports = router;
    