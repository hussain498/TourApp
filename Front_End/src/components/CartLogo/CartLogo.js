import React from "react";
import { IoIosCart } from "react-icons/io";


const Cart = (props) => {
  return (
    <div style={{ fontSize: "20px", position: "relative" }}>
      <span
        style={{
          position: "absolute",
          background: "white",
          width: "15px",
          height: "15px",
          borderRadius: "5px",
          fontSize: "10px",
          fontWeight:"bolder",
          border: "1px solid #fff",
          textAlign: "center",
          alignSelf: "center",
          top: "-11px",
          right: "-6px",
          color:"black"
        }}
      >
        {props.count}
      </span>
      <IoIosCart />
    </div>
  );
};

export default Cart;