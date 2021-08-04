import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {signout} from '../../actions/auth.actions'

const Navbar = (props) => {
  const auth = useSelector((state) => state.auth);
   const dispatch = useDispatch()

  const logOut =()=>{
    dispatch(signout())
  }

  const renderNonLoginLinks = () => {
    return (
      <div className="navbar-nav ml-auto">
        <NavLink className="nav-link  text-white " to="/signin">
          SignIn
        </NavLink>
        <NavLink className=" nav-link " to="/signup">
          SignUp
        </NavLink>
      </div>
    );
  };
  const renderLoginLinks = () => {
    return (
      <div className="navbar-nav ml-auto">
        <NavLink className="nav-link  text-white " to="/signin" onClick={logOut}>
          SignOut
        </NavLink>
      </div>
    );
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark  px-5"
        style={{ zIndex: 1 }}
      >
        <Link className="navbar-brand" to="/">
          Admin Dashboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

             {auth.authenticate ? renderLoginLinks():renderNonLoginLinks()}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
