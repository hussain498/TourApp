import React, {  useState } from "react";
import { useSelector } from "react-redux";
import { generatePublicUrl } from "../../urlConfig";

const OrderSummery = (props) => {
  const cart = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState(cart.cartItems);


  return (
    <div>
      <div className="card">
        <div className="container-fluid">
          <div className="row pt-3">
            <div className="col-12 px-0 border">
              <div className="container-fluid">
                <div className="row border ">
                  <div className="col-6">My Cart</div>
                  <div className="col-6 text-right">Deliver to</div>
                </div>
                {Object.keys(cartItems).map((key, index) => (
                  <div key={index} className="row border py-3">
                    <div className="col-8 text-left">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-3 cart_image">
                            <img
                              className=""
                              src={generatePublicUrl(cartItems[key].img)}
                            />
                          </div>
                          <div className="col-12">
                            <div className="row">
                              <div className="col-12">
                                {cartItems[key].name}
                              </div>
                              <div className="col-12">
                                Rs. {cartItems[key].price}
                              </div>
                            </div>
                          </div>
                        </div>
                
                      </div>
                    </div>
                    <div className="col-4 text-right">
                      Delivery in 3 - 5 days
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div className="col-8 text-right ">
              <button
                className="btn m-3 btn-warning"
                onClick={() => props.history.push("/checkout")}
              >
                Place Order
              </button>
            </div>
            <div className="col-4 text-right"></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default OrderSummery;
