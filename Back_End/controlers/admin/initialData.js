const CATEGORY = require("../../models/categoryModel");
const PRODUCT = require("../../models/productModel");
const ORDER = require("../../models/order");

const createCategories = (categories, parentId = null) => {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      parentId: cate.parentId,
      type: cate.type,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
};

exports.initialData = async (req, res) => {
  const categories = await CATEGORY.find({}).exec();
  const orders = await ORDER.find({}).exec();

  const PAGE_SIZE = 18;
  const page = parseInt(req.query.page || "0");
  const total = await PRODUCT.countDocuments({});
  const Products = await PRODUCT.find({})
    .select(
      "_id name description productPictures Catagory name price quantity slug"
    )
    .populate({ path: "Catagory", select: "_id name" })
    .limit(PAGE_SIZE)
    .skip(PAGE_SIZE * page);
     res.json({
    totalPages: Math.ceil(total / PAGE_SIZE),
    Products,
    categories: createCategories(categories), 
    orders,
  });
};
