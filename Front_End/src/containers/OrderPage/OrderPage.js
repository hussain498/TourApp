import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions";
import "./OrderPage.css";
import { generatePublicUrl } from "../../urlConfig";
import { IoIosArrowForward } from "react-icons/io";
import ErrorMessages from "../../components/ErrorMessage/ErrorMessages";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import { addRating_Review, deleteOrder } from "../../actions";

const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // const [getRatingsModel, setgetRatingsModel] = useState(false);
  const [orderedProductId, setorderedProductId] = useState("");

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const deleteOrderFromList = (order) => {
    dispatch(deleteOrder(order._id));
  };

  // const addReviewRatings = (id) => {
  //   setgetRatingsModel(true);
  //   setorderedProductId(id._id);
  // };

  // const initialValues = {
  //   Review: "",
  //   rating: "",
  // };
  // const validationSchema = Yup.object({
  //   Review: Yup.string().required("Review is a required field"),
  //   rating: Yup.string().required("A radio option is required"),
  // });
  // const onSubmit = (values) => {
  //   // console.log(values);
  //   const payload = {
  //     productId:orderedProductId,
  //     review: values.Review,
  //     rating: values.rating,
  //   };

  //   dispatch(addRating_Review(payload));
  // };

  // const RatingModel = () => {
  //   return (
  //     <Modal show={getRatingsModel} onHide={setgetRatingsModel}>
  //       <Modal.Header closeButton></Modal.Header>
  //       <Formik
  //         initialValues={initialValues}
  //         validationSchema={validationSchema}
  //         onSubmit={onSubmit}
  //       >
  //         <Form className="form-signin mx-5">
  //           <div className="row">
  //             <div className="col-12 ">Give Product A Rating</div>
  //           </div>
  //           <div className="row text-center">
  //             <div className="col-12">
  //               <div className="rating">
  //                 <Field
  //                   type="radio"
  //                   name="rating"
  //                   className="d-none"
  //                   value="5"
  //                   id="5"
  //                 />
  //                 <label htmlFor="5">☆</label>{" "}
  //                 <Field
  //                   type="radio"
  //                   name="rating"
  //                   className="d-none"
  //                   value="4"
  //                   id="4"
  //                 />
  //                 <label htmlFor="4">☆</label>{" "}
  //                 <Field
  //                   type="radio"
  //                   name="rating"
  //                   className="d-none"
  //                   value="3"
  //                   id="3"
  //                 />
  //                 <label htmlFor="3">☆</label>{" "}
  //                 <Field
  //                   type="radio"
  //                   name="rating"
  //                   className="d-none"
  //                   value="2"
  //                   id="2"
  //                 />
  //                 <label htmlFor="2">☆</label>{" "}
  //                 <Field
  //                   type="radio"
  //                   name="rating"
  //                   className="d-none"
  //                   value="1"
  //                   id="1"
  //                 />
  //                 <label htmlFor="1">☆</label>
  //               </div>
  //             </div>
  //           </div>
  //           <Field
  //             type="text"
  //             className="form-control mb-2"
  //             placeholder="Write A review  About product"
  //             name="Review"
  //           />

  //           <ErrorMessage name="Review" component={ErrorMessages} />

  //           <button
  //             className="btn btn-lg btn-primary btn-block mb-3"
  //             type="submit"
  //           >
  //             Submit Your Review
  //           </button>
  //         </Form>
  //       </Formik>
  //     </Modal>
  //   );
  // };

  return (
    <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
      <div className="breed pt-2 ">
        <ul>
          <li>
            <a href="/">Home</a>
            <IoIosArrowForward />
          </li>
          <li>
            <a href="/account">My Account</a>
            <IoIosArrowForward />
          </li>
          <li>
            <a href="/orders">My Orders</a>
            <IoIosArrowForward />
          </li>
        </ul>
      </div>
      {user.orders.length > 0 ? (
        user.orders.map((order) => {
          return order.items.map((item, index) => (
            <div
              key={index}
              className="card"
              style={{ display: "block", margin: "5px 0" }}
            >
              <div
                // to={`/order_details/${order._id}`}
                className="orderItemContainer"
              >
                <div className="orderImgContainer">
                  <img
                    className="orderImg"
                    src={generatePublicUrl(
                      item.productId.productPictures[0].img
                    )}
                  />
                </div>
                <div className="orderRow">
                  <div className="orderName">
                    <strong>Name</strong>
                    <br />
                    {item.productId.name}
                  </div>
                  <span className="value">
                    <strong>Quantity</strong>
                    <br /> {item.purchasedQty}
                  </span>
                  <div className="orderPrice">
                    <strong>PayAble Price</strong>
                    <br />
                    Rs. {item.payablePrice * item.purchasedQty}
                  </div>
                  <div>
                    <strong>Processing</strong>
                    <br />

                    {order.orderStatus.map((val, index) => {
                      return val.isCompleted == true ? (
                        <div key={index}>
                          <div className="flexRow" style={{ display: "flex" }}>
                            <div style={{ textTransform: "uppercase" }}>
                              {val.type}
                            </div>
                            <div>
                              <i className="fas fa-check pl-5"></i>
                            </div>
                          </div>
                          {val.type == "delivered" ? (
                            <div className="pl-5 ml-5">
                              <div className="pl-5 ml-5">
                                <button
                                  onClick={() => deleteOrderFromList(order)}
                                  className="ml-5 btn btn-danger"
                                >
                                  Delete Order From Order List
                                </button>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <div key={index} style={{ textTransform: "uppercase" }}>
                          {val.type}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ));
        })
      ) : (
        <div className="container">
          <div className="row text-center pt-5">
            <div className="col-12">
              <h2>There is no order in your list</h2>
            </div>
          </div>
        </div>
      )}
      {/* {RatingModel()} */}
    </div>
  );
};

export default OrderPage;
