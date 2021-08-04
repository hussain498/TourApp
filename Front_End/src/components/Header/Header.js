import React, { useEffect, useState } from "react";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {
  login,
  signout,
  settingAuthStatetoNull,
  signup,
  emptyErrorFiildsAfterSignUp,
} from "../../actions";
import { Modal } from "react-bootstrap";
import LoaderAnimation from "../../LoaderAnimation/LoaderAnimation";
import CartLogo from "../CartLogo/CartLogo";
import ErrorMessages from "../ErrorMessage/ErrorMessages";
import SearchBar from "./SearchBar";
////////////validations
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const Header = () => {
  const [signupModel, setsignupModel] = useState(false);
  const [signInModel, setsignInModel] = useState(false);
  const [succesfullAlert, setsuccesfullAlert] = useState(false);
  const dispatch = useDispatch();
  let auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const LogOut = () => {
    dispatch(signout());
  };

  useEffect(() => {
    if (auth.message) {
      setsuccesfullAlert(true);
      setsignupModel(false);
    }
    return () => {
      dispatch(settingAuthStatetoNull()).then(() => setsuccesfullAlert(false));
    };
  }, [auth.message]);

  const notify = () =>
    toast.info(
      "Congradulations You Have Been registered LOGIN to continue....",

      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => dispatch(emptyErrorFiildsAfterSignUp()),
      }
    );

  if (succesfullAlert) notify();

  const renderLoggedInMenu = () => {
    return (
      <div className="dropdown">
        <a
          className="pr-4"
          style={{ textDecoration: "none", color: "yellow" }}
          href="#"
        >
          {auth.user.fullName}
        </a>

        <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
          <Link to="/orders" className="dropdown-item" type="button">
            Orders
          </Link>

          <Link to="" onClick={LogOut} className="dropdown-item" type="button">
            Log Out
          </Link>
        </div>
      </div>
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <div className="dropdown">
        <button
          className="btn btn-success my-2 my-sm-0 "
          type="button"
          onClick={() => setsignInModel(true)}
        >
          Login
        </button>
      </div>
    );
  };

  const InitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const ValidationSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email is a required field"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });
  const OnSubmit = (values) => {
    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    };
    dispatch(signup(user));
  };

  const SignupModel = () => {
    return (
      <Modal show={signupModel} onHide={setsignupModel}>
        <Modal.Header closeButton></Modal.Header>
        <Formik
          initialValues={InitialValues}
          validationSchema={ValidationSchema}
          onSubmit={OnSubmit}
        >
          <Form className="form-signin mx-5">
            <div className="row text-center">
              <div className="col-12">
                <h2 className="h3 mb-3 font-weight-normal ">Sign Up</h2>
              </div>
            </div>
            <Field
              type="text"
              className="form-control mb-2"
              placeholder="First Name"
              name="firstName"
            />

            <ErrorMessage name="firstName" component={ErrorMessages} />
            <Field
              type="text"
              className="form-control mb-2"
              placeholder="Last Name"
              name="lastName"
            />

            <ErrorMessage name="lastName" component={ErrorMessages} />
            <Field
              type="email"
              className="form-control mb-2"
              placeholder="Email address"
              name="email"
            />

            <ErrorMessage name="email" component={ErrorMessages} />

            <Field
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              name="password"
            />
            <div>
              <ErrorMessage name="password" component={ErrorMessages} />
            </div>

            <div>
              {auth.error ? <p style={{ color: "red" }}>{auth.error}</p> : null}
            </div>
            <button
              className="btn btn-lg btn-primary btn-block mb-3"
              type="submit"
            >
              Sign In
            </button>
            {/* <div className="mb-4">
              <a href="#">Forget Password..?</a>
            </div> */}
          </Form>
        </Formik>
      </Modal>
    );
  };

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email is a required field"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });
  const onSubmit = (values) => {
    const user = {
      email: values.email,
      password: values.password,
    };

    dispatch(login(user)).then(() => setsignInModel(false));
  };

  const SigninModel = () => {
    return (
      <Modal show={signInModel} onHide={setsignInModel}>
        <Modal.Header closeButton></Modal.Header>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="form-signin mx-5">
            <div className="row text-center">
              <div className="col-12">
                <h2 className="h3 mb-3 font-weight-normal ">Login</h2>
              </div>
            </div>
            <Field
              type="email"
              className="form-control mb-2"
              placeholder="Email address"
              name="email"
            />

            <ErrorMessage name="email" component={ErrorMessages} />

            <Field
              type="password"
              className="form-control mb-2"
              placeholder="Password"
              name="password"
            />
            <div>
              <ErrorMessage name="password" component={ErrorMessages} />
            </div>

            <div>
              {auth.error ? <p style={{ color: "red" }}>{auth.error}</p> : null}
            </div>
            <button
              className="btn btn-lg btn-primary btn-block mb-3"
              type="submit"
            >
              Sign In
            </button>
            {/* <div className="mb-4">
              <a href="#">Forget Password..?</a>
            </div> */}
          </Form>
        </Formik>
      </Modal>
    );
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand ml-5" href="/">
         Hickers
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ml-5 pl-5">
              <SearchBar />
            </li>
          </ul>

          {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}
          {!auth.authenticate && (
            <button
              className="btn btn-danger my-2 my-sm-0 ml-2"
              type="submit"
              onClick={() => setsignupModel(true)}
            >
              SignUP
            </button>
          )}

          {auth.authenticate && (
            <Link
              style={{ textDecoration: "none", color: "yellow" }}
              to="/cart"
              className="cart"
              type="submit"
            >
              <div style={{ display: "flex" }}>
                <CartLogo count={Object.keys(cart.cartItems).length} />
                <span className="pt-2" style={{ margin: "o 10px" }}>
                  Cart
                </span>
              </div>
            </Link>
          )}
        </div>
      </nav>
      {SignupModel()}
      {SigninModel()}
    </div>
  );
};

export default Header;
