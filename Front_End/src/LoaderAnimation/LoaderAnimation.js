import React from "react";
import "./LoaderAnimation.css";

const LoaderAnimation = () => {
  return (
    <div className="whole-body-wrapper" style={{zIndex:"111111111111111111111"}}>
      <div className="loading">
        <div className="obj"></div>
        <div className="obj"></div>
        <div className="obj"></div>
        <div className="obj"></div>
        <div className="obj"></div>
        <div className="obj"></div>
        <div className="obj"></div>
        <div className="obj"></div>
      </div>
    </div>
  );
};

export default LoaderAnimation;
