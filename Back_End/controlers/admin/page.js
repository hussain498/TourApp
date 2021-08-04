const PAGEMODEL = require("../../models/pageModel");

exports.createPage = (req, res) => {
  const { banners, products } = req.files;
  if (banners.length > 0) {
    req.body.banners = banners.map((banner) => ({
      img: `${process.env.API}/public/${banner.filename}`,
      navigateto: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  }
  if (products.length > 0) {
    req.body.products = products.map((product) => ({
      img: `${process.env.API}/public/${product.filename}`,
      navigateto: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
    }));
  }

  req.body.createdBy = req.user._id;

  PAGEMODEL.findOne({ category: req.body.category }).exec((error, page) => {
    if (error) return res.status(400).json({ error });
    if (page) {
      PAGEMODEL.findOneAndUpdate(
        { category: req.body.category },
        req.body
      ).exec((error, updatePage) => {
        if (error) return res.status(400).json({ error });
        if (updatePage) return res.status(200).json({ page: updatePage });
      });
    } else {
      const page = new PAGEMODEL(req.body);
      page.save((error, page) => {
        if (error) {
          return res.status(400).json({ error });
        }
        if (page) {
          return res.status(201).json({ page });
        }
      });
    }
  });
};

exports.getpage=(req,res)=>{
  const {category,type} = req.params
  if(type="page"){
    PAGEMODEL.findOne({category:cateory})
    .exec((error,pgae)=>{
      if(error) return res.status(400).json({error})
      if(page) return res.status(200).json({page})
    })
  }
}