import React from "react";
import "./Side_bar.css";

import { NavLink } from "react-router-dom";

const Side_bar = () => {
  return (
    <div className="container-fluid sidebar">
      <div className="row">
        <div className="col-12 ">
          <ul>
          {/* <li>
              <NavLink to={"/home"}>Home</NavLink>
            </li> */}
            {/* <li>
              <NavLink to={"/page"}>page</NavLink>
            </li> */}
            <li>
              <NavLink to={"/products"}>Products</NavLink>
            </li>
            {/* <li>
              <NavLink  to={"/category"}>Category</NavLink>
            </li> */}
            <li>
              <NavLink to={"/orders"}>Orders</NavLink>
            </li>
         
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Side_bar;
