import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAddress, getCartItems } from "../../actions";
import { login, signout } from "../../actions";

import "./CheckOutPage.css";
import AddressForm from "./AddressForm.js";
import PriceDetails from "../../components/PriceDetails/PriceDetails";
import OrderSummery from "../OrderSummery/OrderSummery";

const CheckOutPage = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [newAddressform, setnewAddressform] = useState(false);
  const [
    AddressArrayToMapToShowAddresses,
    setAddressArrayToMapToShowAddresses,
  ] = useState([]);
  const [confirmAddress, setconfirmAddress] = useState(false);
  const [selectedAddress, setselectedAddress] = useState(null);
  const [orderSummeryStepthree, setorderSummeryStepthree] = useState(false);
  const [orderConfirmationEmail, setorderConfirmationEmail] = useState(false);
  const [payemntOptions, setpayemntOptions] = useState(false);
  const [confirmOrder, setconfirmOrder] = useState(false);

  const CheckOutStep = (props) => {
    return (
      <div className="checkoutStep">
        <div
          onClick={props.onClick}
          className={`checkoutHeader ${props.active && "active"}`}
        >
          <div>
            <span className="stepNumber">{props.stepNumber}</span>
            <span className="stepTitle">{props.title}</span>
          </div>
        </div>
        {props.body && props.body}
      </div>
    );
  };

  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };

  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
 
  const dispatch = useDispatch();

  const onAddressSubmit = () => {
    setnewAddressform(false);
  };

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddressArrayToMapToShowAddresses(address);
  }, [user.address]);

  const selectAddress = (addr) => {
    const updatedAddressArrayToMapToShowAddresses = AddressArrayToMapToShowAddresses.map(
      (adr) =>
        adr._id === addr._id
          ? { ...adr, selected: true }
          : { ...adr, selected: false }
    );
    setAddressArrayToMapToShowAddresses(
      updatedAddressArrayToMapToShowAddresses
    );
  };
  const enableAddressEditForm = (addr) => {
    const updatedAddressArrayToMapToShowAddresses = AddressArrayToMapToShowAddresses.map(
      (adr) =>
        adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddressArrayToMapToShowAddresses(
      updatedAddressArrayToMapToShowAddresses
    );
  };

  const confirmDeliveryAddress = (adr) => {
    setconfirmAddress(true);
    setselectedAddress(adr);
    setorderSummeryStepthree(true);

    // console.log(adr);
  };

  const sendEmailToConfirmOrder = () => {
    setorderConfirmationEmail(true);
    setorderSummeryStepthree(false);
    setpayemntOptions(true);
  };

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      },
      0
    );
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
      productName: cart.cartItems[key].name,
    }));
    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType: "cod",
    };

    console.log(payload);
    dispatch(addOrder(payload));
    setconfirmOrder(true);
  };

  if (confirmOrder) {
    return (
      <div className="container">
        <div className="row text-center pt-5">
          <div className="col-12">
            
            <h2>YOUR ORDER HAS BEEN PLACED</h2>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-12">
            <h3>
              Go to your{" "}
              <a className="btn btn-sm btn-border-info" href="/orders">
                ORDERS
              </a>{" "}
              BY CLICKING LINK
            </h3>
          </div>
        </div>
      </div>
    );
  }

  else{
  return (
    <div className="cartContainer " style={{ alignItems: "flex-start" }}>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-8">
            <CheckOutStep
              stepNumber={"1"}
              title={"login"}
              active={!auth.authenticate}
              body={
                auth.authenticate ? (
                  <div className="loggedInId">
                    <span style={{ fontWeight: 500 }}>
                      {auth.user.fullName}
                    </span>
                    <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                  </div>
                ) : (
                  <form className="px-5 pt-4">
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <input
                          type="email"
                          className="form-control mb-2"
                          value={email}
                          placeholder="Email address"
                          required
                          onChange={(e) => setemail(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <input
                          type="password"
                          className="form-control mb-2"
                          value={password}
                          placeholder="Password"
                          required
                          onChange={(e) => setpassword(e.target.value)}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <button onClick={userLogin} className="btn btn-primary">
                          Login
                        </button>
                      </div>
                    </div>
                  </form>
                )
              }
            />
            <CheckOutStep
              stepNumber={"2"}
              title={"DELIVERY ADDRESS"}
              active={!confirmAddress && auth.authenticate}
              body={
                <>
                  {confirmAddress ? (
                    <div className="ml-5">{`${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                  ) : (
                    AddressArrayToMapToShowAddresses.map((adr, index) => (
                      <div key={index}>
                        {!adr.edit ? (
                          <div className="flexRow addressContainer">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <input
                                name="address"
                                className="mt-3"
                                onClick={() => selectAddress(adr)}
                                type="radio"
                              />
                              <div className="flexRow sb addressinfo">
                                <div className="pb-2">
                                  <div>
                                    <span className="pr-3">{adr.name}</span>
                                    <span className="pr-3">
                                      {adr.addressType}
                                    </span>
                                    <span>{adr.mobileNumber}</span>
                                  </div>
                                </div>
                                {adr.address}
                              </div>
                            </div>

                            {adr.selected && (
                              <div
                                className="pt-2"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <button
                                  className="btn btn-secondary mx-3"
                                  onClick={() => confirmDeliveryAddress(adr)}
                                >
                                  Delievery Here
                                </button>
                                <button
                                  onClick={() => enableAddressEditForm(adr)}
                                  className="btn btn-info"
                                >
                                  edit
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="pt-5">
                            <AddressForm
                              onAddressSubmit={onAddressSubmit}
                              initialData={adr}
                            />
                          </div>
                        )}{" "}
                      </div>
                    ))
                  )}
                </>
              }
            />
            {auth.authenticate ? (
              <>
                {confirmAddress ? null : newAddressform ? (
                  <AddressForm onAddressSubmit={onAddressSubmit} />
                ) : (
                  <CheckOutStep
                    stepNumber={"+"}
                    title={"ADD NEW ADDRESS"}
                    active={false}
                    onClick={() => setnewAddressform(true)}
                  />
                )}
              </>
            ) : null}

            <CheckOutStep
              stepNumber={"3"}
              title={"ORDER SUMMERY"}
              active={orderSummeryStepthree}
              body={
                orderSummeryStepthree ? (
                  <OrderSummery />
                ) : orderConfirmationEmail ? (
                  <div className="ml-5">
                    {Object.keys(cart.cartItems).length} items
                  </div>
                ) : null
              }
            />
            {orderSummeryStepthree && (
              <div className="card bg-light">
                <div className="row pt-3 pb-2">
                  <div className="col-9"></div>
                  <div className="col-3">
                    <button
                      className="btn btn-block btn-warning"
                      onClick={sendEmailToConfirmOrder}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            )}

            <CheckOutStep
              stepNumber={"4"}
              title={"PAYMENT OPTIONS"}
              active={payemntOptions}
              body={
                payemntOptions && (
                  <div>
                    <div
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <input
                        className="mt-3 ml-4"
                        type="radio"
                        name="paymentOption"
                        value="cod"
                      />
                      <div className="ml-3 mt-2">Cash On Delivery</div>
                    </div>
                    <button
                      className="m-3 btn btn-warning "
                      onClick={onConfirmOrder}
                    >
                      CONFIRM ORDER
                    </button>
                  </div>
                )
              }
            />
          </div>
          <div className="col-4">
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
  )}
};

export default CheckOutPage;
