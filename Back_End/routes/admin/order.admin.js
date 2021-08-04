const express = require("express");
const {
  requireSignin,
  adminMiddleware,
} = require("../../common-Middlewares/index");
const {
  updateOrder,
  getCustomerOrders,
} = require("../../controlers/admin/order.admin");
const router = express.Router();

router.post(`/order/update`, requireSignin, adminMiddleware, updateOrder);
router.post(
  `/order/getCustomerOrders`,
  requireSignin,
  adminMiddleware,
  getCustomerOrders
);

module.exports = router;
