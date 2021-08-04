const express = require("express");
const router = express.Router();
const productController = require("../controlers/product");
const common_midddleware = require("../common-Middlewares/index");
//multer imports
const multer = require("multer");
const shortid = require('shortid')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    }, 
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })
  

router.post(  
  "/product/create", 
  common_midddleware.requireSignin,
  common_midddleware.adminMiddleware,
  upload.array("productPictures"), 
  productController.createProduct
); 

// router.post( 
//   "/reviews/update",
//   common_midddleware.requireSignin,
//   common_midddleware.userMiddleware,
//   upload.array("productPictures"), 
//   productController.updateProductReviews
// );
router.get('/products/:slug',productController.getProductBySlug)
router.get('/product/:productId',productController.getProductDetailsById)


// router.get("/category/getCatagory", categoryController.getCategories);

module.exports = router;
