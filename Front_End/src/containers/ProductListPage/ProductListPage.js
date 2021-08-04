import React, { useEffect, useState } from "react";
import { getProductsBySlug } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import "./ProductListPage.css";
import { generatePublicUrl } from "../../urlConfig";
import { Link } from "react-router-dom";

const ProductListPage = (props) => {
  const [priceRange, setpriceRange] = useState({
    under5k: 5000,
    under10k: 10000,
    under15k: 15000,
    under20k: 20000,
    under30k: 30000,
  });
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductsBySlug(props.match.params.slug));
  }, [props.match.params.slug]);

  return (
    <div>
      {Object.keys(product.productsbyPrice).map((key, index) => {
        return (
          <div key={index}>
            {
              key ? 
            <div className="row px-5 rounded border">
              <h3 className="p-3">
                {props.match.params.slug} Category under RS. {priceRange[key]}
              </h3>
            </div>:null}
            <div className="card-group ">
              {product.productsbyPrice[key].map((product, index) => {
                return (
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    key={index}
                    to={`/${product.slug}/${product._id}/p`}
                    className="productContainer my-4"
                  >
                    <div className="productImgContainer">
                      <img
                        src={generatePublicUrl(product.productPictures[1].img)}
                        alt="image"
                      ></img>
                    </div>
                    <div className="productInfo">
                      <div style={{ margin: "5px" }}>{product.name}</div>
                      <div>
                        <span>4.3</span>&nbsp;
                        <span>3353</span>
                      </div>
                      <div className="productPrice">{product.price}</div>
                    </div>
                  </Link>
                );
              })}
            </div>{" "}
          </div>
        );
      })}
    </div>
  );
};

export default ProductListPage;
