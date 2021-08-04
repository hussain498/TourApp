import React, { useState } from "react";

const IncrementDecrementfunctionality = (props) => {
  const { _id } = props.cartItem;
  const [qty, setqty] = useState(props.cartItem.qty);

  const onQuantityIncrement = () => {
    setqty(qty + 1);
    props.onQuantityinc(_id, qty + 1);
  };
  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setqty(qty - 1);
    props.onQuantitydec(_id, qty - 1);
  };
  return (
    <div className="row pt-2">
      <div className="col-1 px-0">
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={onQuantityIncrement}
        >
          +
        </button>
      </div>
      <div className="col-1 px-0">
        <input
          className=""
          style={{ width: "20px" }}
          onChange={() => {}}
          value={qty}
        ></input>
      </div>
      <div className="col-1 px-0">
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={onQuantityDecrement}
        >
          -
        </button>
      </div>
      <div className="col-4">
        <button
          className="btn btn-danger"
          onClick={() => props.onRemoveCartItem(_id)}
        >
          Remove
        </button>
      </div>
      <div className="col-3">
        {/* <button className="btn btn-info">Save For Later</button> */}
      </div>
    </div>
  );
};

export default IncrementDecrementfunctionality;
