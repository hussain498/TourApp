import React, { useEffect, useState } from "react";
import "./CartPage.css";
import { useDispatch, useSelector } from "react-redux";
import { generatePublicUrl } from "../../urlConfig";
import IncrementDecrementfunctionality from "./IncrementDecrementfunctionality";
import { addToCart, getCartItems, removeCartItem } from "../../actions";
import PriceDetails from "../../components/PriceDetails/PriceDetails";

const CartPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();


  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQuantityDecriment = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id })).then(()=>dispatch(getCartItems())); 
  };

  return (
    <div>
      <div className="card">
        <div className="container-fluid">
          <div className="row pt-3">
            <div className="col-8 px-0 border">
              <div className="container-fluid">
                <div className="row border ">
                  <div className="col-6">My Cart</div>
                  <div className="col-6 text-right">Deliver to</div>
                </div>
                {Object.keys(cartItems).length > 0 ? (
                  Object.keys(cartItems).map((key, index) => (
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
                            <div className="col-8">
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
                          <IncrementDecrementfunctionality
                            key={index}
                            cartItem={cartItems[key]}
                            onQuantityinc={onQuantityIncrement}
                            onQuantitydec={onQuantityDecriment}
                            onRemoveCartItem={onRemoveCartItem}
                          />
                        </div>
                      </div>
                      <div className="col-4 text-right">
                        Delivery in 3 - 5 days
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center">
                    <div className="col-12 pt-3">
                      Your Cart Is Currently Empty
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-4 border ">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <PriceDetails
                      totalItem={Object.keys(cart.cartItems).reduce(function (
                        qty,
                        key
                      ) {
                        return qty + cart.cartItems[key].qty;
                      },
                      0)}
                      totalPrice={Object.keys(cart.cartItems).reduce(
                        (totalPrice, key) => {
                          const { price, qty } = cart.cartItems[key];
                          return totalPrice + price * qty;
                        },
                        0
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {Object.keys(cartItems).length > 0 ?
          <div className="row">
            <div className="col-8 text-right ">
              <button
                className="btn m-3 btn-warning"
                onClick={() => props.history.push("/checkout")}
              >
                Place Order
              </button>
            </div>
            <div className="col-4 text-right"></div>
          </div>:null}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
