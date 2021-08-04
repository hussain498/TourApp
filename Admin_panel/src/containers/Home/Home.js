import React from "react";
import Side_bar from "../Side_bar/Side_bar";
import "./Home.css";

const Home = () => {
  return (
    <div className="container-fluid">
      <div className="row  ">
        <div className="col-2 mx-0 px-0  ">
          <Side_bar />
        </div>
        <div className="col-10  ">Home Status</div>
      </div>
    </div>
  );
};

export default Home;
