const express = require("express");
const router = express.Router();
const categoryController = require("../controlers/cataegory");
const {
  requireSignin,
  adminMiddleware,
  upload,
} = require("../common-Middlewares/index"); 

router.post(
  "/category/create",
  requireSignin,
  upload.single("categoryImage"),
  adminMiddleware, 
  categoryController.addCategory
);
router.get("/category/getCatagory", categoryController.getCategories);
router.post(
  "/category/update",
  upload.array("categoryImage"),
  categoryController.updateCategories
);

router.post("/category/delete", categoryController.deleteCategories);
module.exports = router;
