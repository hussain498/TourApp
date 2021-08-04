import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Side_bar from "../Side_bar/Side_bar";
import { Modal } from "react-bootstrap";
import Input from "../../components/Reusable-components/Inputfield";
import { createPage } from "../../actions";

const NewPage = () => {
  const [createModel, setcreateModel] = useState(false);
  const [title, settitle] = useState("");
  const [categories, setcategories] = useState([]);
  const [categoryId, setcategoryId] = useState("");
  const [Desc, setDesc] = useState("");
  const [Type, setType] = useState("");
  const [banners, setbanners] = useState([]);
  const [products, setproducts] = useState([]);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        _id: category._id,
        name: category.name,
        parentId: category.parentId,
        type: category.type,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  useEffect(() => {
    setcategories(createCategoryList(category.categories));
  }, [category]);

  useEffect(() => {
    if (!page.loading) {
      setcreateModel(false);
      settitle("");
      setcategoryId("");
      setDesc("");
      setproducts([]);
      setbanners([]);
    }
  }, [page]);

  const onCategoryChange = (e) => {
    const category = categories.find(
      (category) => category._id === e.target.value
    );
    setcategoryId(e.target.value);
    setType(category.type);
  };
  const handleBannerImages = (e) => {
    setbanners([...banners, e.target.files[0]]);
  };
  const handleProductImages = (e) => {
    setproducts([...products, e.target.files[0]]);
  };

  const handleSubmitData = (e) => {
    const form = new FormData();
    form.append("title", title);
    form.append("description", Desc);
    form.append("category", categoryId);
    form.append("type", Type);
    banners.forEach((banner) => {
      form.append("banners", banner);
    });
    products.forEach((product) => {
      form.append("products", product);
    });
    dispatch(createPage(form));
  };

  const renderCreatePageModel = () => {
    return (
      <Modal show={createModel} onHide={setcreateModel}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <div className="conatiner-fluid px-5">
          <div className="row">
            <div className="col-12">
              <select
                className="form-control form-control-sm"
                value={categoryId}
                onChange={onCategoryChange}
              >
                <option>Select category</option>
                {categories.map((cat) => (
                  <option value={cat._id} key={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Input
                value={title}
                placeholder={"page Title"}
                onChange={(e) => settitle(e.target.value)}
                className="form-control-sm"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Input
                value={Desc}
                placeholder={"page disctiption"}
                onChange={(e) => setDesc(e.target.value)}
                className="form-control-sm"
              />
            </div>
          </div>
          <h6>Banners</h6>
          {banners.length > 0
            ? banners.map((banner, index) => {
                return (
                  <div className="row " key={index}>
                    <div className="col-12">{banner.name}</div>
                  </div>
                );
              })
            : null}

          <div className="row">
            <div className="col-12">
              <Input
                type="file"
                name="banners"
                onChange={handleBannerImages}
                className="form-control-sm"
              />
            </div>
          </div>
          <h6>Products</h6>

          {products.length > 0
            ? products.map((product, index) => {
                return (
                  <div className="row" key={index}>
                    <div className="col-12">{product.name}</div>
                  </div>
                );
              })
            : null}
          <div className="row">
            <div className="col-12">
              <Input
                type="file"
                name="products"
                onChange={handleProductImages}
                className="form-control-sm"
              />
            </div>
          </div>
          <button className="btn btn-danger" onClick={handleSubmitData}>
            Submit
          </button>
        </div>
      </Modal>
    );
  };

  return (
    <div className="container-fluid">
      <div className="row  ">
        <div className="col-2 mx-0 px-0 ">
          <Side_bar />
        </div>
        <div className="col-10">
          {page.loading ? (
            <h1>Loading please...........wait!</h1>
          ) : (
            <>
              {renderCreatePageModel()}
              <button
                className="btn btn-primary mx-5 my-2"
                onClick={() => setcreateModel(true)}
              >
                Add New Page
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewPage;
