import React, { useState } from "react";
import Input from "../../components/Reusable-components/Inputfield";
import { signup } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Signup = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState(""); 
  const [error, seterror] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = useSelector(state=> state.user)
  const userSignin = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password,
    };
    dispatch(signup(user));
  };
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }
  if(user.loading){
    return <p className="text-center mt-5 pt-5">Loading.......</p>
  }
// if(user.message){
//   return <Redirect to={"/"} />;

// }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-5">
          <form onSubmit={userSignin}>
            <div className="row">
              <div className="col-6">
                <Input
                  label="First Name"
                  placeholder="Enter Your first Name"
                  value={firstName}
                  type="text"
                  onChange={(e) => setfirstName(e.target.value)}
                />
              </div>
              <div className="col-6">
              <Input
                  label="Last Name"
                  placeholder="Enter Your Last Name"
                  value={lastName}
                  type="text"
                  onChange={(e) => setlastName(e.target.value)}
                />
              </div>
            </div>
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

export default Signup;
