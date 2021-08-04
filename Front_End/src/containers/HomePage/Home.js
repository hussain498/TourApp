import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePublicUrl } from "../../urlConfig";
import { Link } from "react-router-dom";
import { getIntialData } from "../../actions";

const Home = () => {
  const dispatch = useDispatch();
  const initialData = useSelector((state) => state.initialData);
  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    dispatch(getIntialData(pageNumber));
  }, [pageNumber]);
  
  useEffect(() => {
    setNumberOfPages(initialData.totalPages);
  }, [initialData.totalPages]);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };
 
  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  if (initialData.loading) {
    return (
      <div className="container-fluid pt-5 mt-5"> 
        <div className="row">
          <div className="col-12 text-center">
            <h4>Loading......</h4>
          </div>
        </div>
      </div>
    );
  } else {
    if (initialData.products.length < 1) {
      return (
        <div className="container-fluid pt-5 mt-5">
          <div className="row">
            <div className="col-12 text-center">
              <h4>No Items Found!</h4>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="container-fluid pt-4">
            <div className="row">
              <div className="col-12 text-center">
                <h2>Our Top Rated Items</h2>
              </div>
            </div>
          </div>
          <div className="card-group ">
            {initialData.products.map((product, index) => {
              return (
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  key={index}
                  to={`/${product.slug}/${product._id}/p`}
                  className="productContainer my-4"
                >
                  <div className="productImgContainer">
                    <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt="image"
                    ></img>
                  </div>
                  <div className="productInfo">
                    <div style={{ margin: "5px" }}>{product.name}</div>
                    <div>
                      <span>4.3</span>&nbsp;
                      <span>3353</span>
                    </div>
                    <div className="productPrice">Rs {product.price}</div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="container mb-5 mt-5">
            <div className="row">
              <div className="col-12 text-center">
                {initialData.totalPages && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className="btn btn-dark mr-2"
                      onClick={gotoPrevious}
                    >
                      Previous
                    </button>
                    {pages.map((pageIndex) => (
                      <div key={pageIndex}>
                        <button
                          className={
                            pageNumber === pageIndex
                              ? "btn btn-dark mx-2"
                              : "btn btn-info mx-2"
                          }
                          onClick={() => setPageNumber(pageIndex)}
                        >
                          {pageIndex + 1}
                        </button>
                      </div>
                    ))}
                    <button className="btn btn-dark ml-2" onClick={gotoNext}>
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
};

export default Home;
