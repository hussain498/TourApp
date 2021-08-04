const CATEGORY = require("../models/categoryModel");
const slugify = require("slugify");
const shortid = require('shortid')

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
      type:cate.type,
      children: createCategories(categories, cate._id),
    });
  }
  return categoryList;
};

exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: `${slugify(req.body.name)}-${shortid.generate()}`,
  };
  if (req.file) {
    categoryObj.catagoryImg = process.env.API + "/public/" + req.file.filename;
  }
  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
  }
  const cat = new CATEGORY(categoryObj);
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error });
    if (category) return res.status(201).json({ category });
  });
};

exports.getCategories = (req, res) => {
  CATEGORY.find({}).exec((error, categories) => {
    if (error) return res.status(400).json({ error });
    if (categories) {
      const categoriesList = createCategories(categories);
      return res.status(200).json({ categoriesList });
    }
  });
};

exports.updateCategories = async (req, res) => { 
  const { _id, name, parentId, type } = req.body;
  const updateCategoriesArray = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }
      const updateCategory = await CATEGORY.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updateCategoriesArray.push(updateCategory);
    }
    return res.status(201).json({ updateCategoriesArray });
  } else {
    const category = {
      name,
      type,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updateCategory = await CATEGORY.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updateCategory });
  }
};

exports.deleteCategories = async (req, res) => {
  const { ids } = req.body.payload;
  const deleteCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await CATEGORY.findByIdAndDelete({
      _id: ids[i]._id,
    });
    deleteCategories.push(deleteCategory);
  }
  if (deleteCategories.length == ids.length) {
    res.status(200).json({ message: "Categories Removed" });
  } else {
    res.status(400).json({ message: "Something Went Wrong" });
  }

};
