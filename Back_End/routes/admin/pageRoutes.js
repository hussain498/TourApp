const express = require("express");
const { createPage, getpage } = require("../../controlers/admin/page");
const {
  requireSignin,
  adminMiddleware,
  upload,
} = require("../../common-Middlewares/index");

const router = express.Router();

router.post(
  "/page/create",
  requireSignin,
  adminMiddleware,
  upload.fields([{ name: "banners" }, { name: "products" }]),
  createPage
);

router.get("/page/:category/:type", getpage);
module.exports = router;
