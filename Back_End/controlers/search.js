const PRODUCTMODEL = require("../models/productModel");

exports.SearchController = (req, res) => {
  const searchItem = req.query.q;
  PRODUCTMODEL.find({
    name: { $regex: searchItem, $options: "$i" },
  }).exec((error, data) => {
    if (error) res.json({ error: "No Items Found" });
    if (data) res.status(200).json({ data });
  });
};
    