const PRODUCT = require("../models/productModel");
const CATEGORY = require("../models/categoryModel");
const slugify = require("slugify");

exports.createProduct = (req, res) => {
  const { name, price, description, Catagory, quantity } = req.body;
  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const product = new PRODUCT({
    name: name,
    slug: slugify(name), 
    price,  
    description,  
    productPictures,
    Catagory, 
    quantity,
    createdBy: req.user._id,
  });
  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) return res.status(200).json({ product });
  });
};

exports.getProductBySlug = (req, res) => {
  const { slug } = req.params;
  CATEGORY.findOne({ name: slug })
    .select("_id")
    .exec((error, category) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (category) {
        console.log(category);
        PRODUCT.find({ Catagory: category._id }).exec((error, products) => {
          if (error) {
            return res.status(400).json({ error });
          }
          if (products.length > 0) {
            res.status(200).json({
              products,
              ProductsByPrice: {
                under5k: products.filter((product) => product.price <= 5000),
                under10k: products.filter(
                  (product) => product.price > 5000 && product.price <= 10000
                ),
                under15k: products.filter(
                  (product) => product.price > 10000 && product.price <= 15000
                ),
                under20k: products.filter(
                  (product) => product.price > 15000 && product.price <= 20000
                ),
                under30k: products.filter(
                  (product) => product.price > 20000 && product.price <= 30000
                ),
              },
            });
          }
        });
      }
    });
};

exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    PRODUCT.findById({ _id: productId }).exec((error, product) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (product) {
        return res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params Required" });
  }
};

// exports.updateProductReviews = (req, res) => {
//   PRODUCT.find({ ratings: { $exists: true, $not: { $size: 0 } } }).exec(
//     (error, product) => {
//       if (error) {
//         return res.status(400).json({ error });
//       }
//       if (product.length > 0) {
//         PRODUCT.findOne({ "ratings.userid": req.user._id  }).exec(
//           (error, product) => {
//             if (error) {
//             }
//             if (product) {
//               return res
//                 .status(200)
//                 .json({ message: "Rating Has Been Already Added" });
//             }
//           }
//         );
//       } else {
//         PRODUCT.findByIdAndUpdate(
//           { _id: req.body.productId },
//           {
//             $push: {
//               ratings: {
//                 userid: req.user._id,
//                 rating: req.body.rating,
//                 review: req.body.review,
//               },
//             },
//           },
//           (err, data) => {
//             if (err) {
//               return res.status(400).json({ message:"Review Not Added Something Went Wrong" });
//             }
//             if (data) {
//               return res.status(200).json({ message:"Review Has Been Addedd" });
//             }
//           }
//         );
//       }
//     }
//   );
// };
