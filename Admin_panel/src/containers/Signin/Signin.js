import React, { useState } from "react";
import Input from "../../components/Reusable-components/Inputfield";
import { login } from "../../actions";
import { useDispatch,useSelector } from "react-redux";
import { Redirect,  } from "react-router-dom";
 
const Signin = (props) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const dispatch = useDispatch();
  let auth = useSelector((state) => state.auth);
  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    }; 
    dispatch(login(user));
  };
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-5">
          <form onSubmit={userLogin}>
            <Input
              label="Email"
              placeholder="Enter Your Email"
              value={email}
              type="email"
              onChange={(e) => setemail(e.target.value)}
            />
            <Input
              label="Password"
              placeholder="Enter Your Password"
              value={password}
              type="password"
              onChange={(e) => setpassword(e.target.value)}
            />

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
