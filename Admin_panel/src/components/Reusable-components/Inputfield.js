import React from "react";

const Input = (props) => {

  return (
    <div className="form-group">
      <label >{props.label}</label>
      <input
        type={props.type}
        className="form-control"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
      <small id="emailHelp" className="form-text text-muted">
        {props.errorMessage}
      </small> 
    </div>  
  );
};

export default Input;
