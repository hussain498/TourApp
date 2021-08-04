const { requireSignin, userMiddleware } = require('../common-Middlewares');
const { addOrder, getOrders, getOrder,deleteOrder } = require("../controlers/order");
const router = require("express").Router();

router.post("/addOrder", requireSignin, userMiddleware, addOrder);
router.get("/getOrders", requireSignin, userMiddleware, getOrders);
router.post("/getOrder", requireSignin, userMiddleware, getOrder);
router.post("/deleteOrder", requireSignin, userMiddleware, deleteOrder);


module.exports = router;