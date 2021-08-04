import React, { useEffect, useState } from "react";
import Side_bar from "../Side_bar/Side_bar";
import { useDispatch, useSelector } from "react-redux";
import { getIntialData, addProduct } from "../../actions";
import { Modal } from "react-bootstrap";
import {generatePublicUrl} from '../../urlConfig'
import Input from "../../components/Reusable-components/Inputfield";
import "./products_page.css";
 
const Category = () => {
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [productPictures, setproductPictures] = useState([]);
  const [quantity, setquantity] = useState("");
  const [productDetailModel, setproductDetailModel] = useState(false);
  const [productDetails, setproductDetails] = useState(null);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);



  const handleProductPictures = (e) => {
    setproductPictures([...productPictures, e.target.files[0]]);
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  const handleSubmitData = (e) => {
    const form = new FormData(); 
    form.append("name", name);
    form.append("price", price);
    form.append("description", description);
    form.append("quantity", quantity);

    for (let pic of productPictures) {
      form.append("productPictures", pic);
    }
    dispatch(addProduct(form));
  };

  const renderProducts = () => {
    return (
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {product.products.length > 0
              ? product.products.map((product) => (
                  <tr
                    data-toggle="modal"
                    data-target="#exampleModal2"
                    onClick={() => {
                      showProductDetailModel(product);
                    }}
                    key={product._id}
                  >
                    <td>1</td>

                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    );
  };
  const renderaddProductModel = () => {
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add New Product
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Input
                value={name}
                placeholder={"Name"}
                onChange={(e) => setname(e.target.value)}
              />
              <Input
                value={price}
                placeholder={"Price"}
                onChange={(e) => setprice(e.target.value)}
              />
              <Input
                value={description}
                placeholder={"Description"}
                onChange={(e) => setdescription(e.target.value)}
              />
              <Input
                value={quantity}
                placeholder={"Quantity"}
                onChange={(e) => setquantity(e.target.value)}
              />

           
              {productPictures.length > 0
                ? productPictures.map((pic) => (
                    <div key={pic.name}>{pic.name}</div>
                  ))
                : null}
              <input
                type="file"
                name="productPictures"
                onChange={handleProductPictures}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-info"
                data-dismiss="modal"
                onClick={() => {
                  handleSubmitData();
                  // refreshPage();
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handlecloseproductdetailmodel = () => {
    setproductDetailModel(false);
  };
  const showProductDetailModel = (product) => {
    setproductDetailModel(true);
    setproductDetails(product);
  };
  const renderProductDetailsModel = () => {
    if (!productDetails) {
      return null;
    }
    return (
      <Modal
        show={productDetailModel}
        onHide={handlecloseproductdetailmodel}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <div className="conatiner-fluid px-5">
          <div className="row">
            <div className="col-6 key">Name</div>
            <div className="col-6 key">Price</div>
          </div>
          <div className="row pb-2">
            <div className="col-6 ">{productDetails.name}</div>
            <div className="col-6">{productDetails.price}</div>
          </div>
          <div className="row">
            <div className="col-6 key">Quantity</div>
            <div className="col-6 key">Category</div>
          </div>
          <div className="row pb-2">
            <div className="col-6">{productDetails.quantity}</div>
    <div className="col-6">{productDetails.Catagory.name}</div>
          </div>
          <div className="row pb-2">
            <div className="col-12 key">Description</div>
            <div className="col-12">{productDetails.description}</div>
          </div>
          <div className="row pb-5">
            <div className="col-12 key pb-2">Product Pictures</div>
            <div className="col-12 d-flex">
              {productDetails.productPictures.map((picture) => {
                return (
                  <div className="product_img_container">
                    <img
                      src={generatePublicUrl(picture.img)}
                    ></img>
                  </div>
                );
              })}
            </div>
          </div>
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
        <div className="col-10 ">
          <div className="container-fluid">
            <div className="row">
              <div
                className="col-md-12 "
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h1>Products</h1>
                <button
                  type="button"
                  className="btn btn-primary mt-2"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Add Product
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 ">{renderProducts()}</div>
            </div>
            {renderaddProductModel()}
            {renderProductDetailsModel()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
