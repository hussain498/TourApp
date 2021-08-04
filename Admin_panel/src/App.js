import {  Route, Switch } from "react-router-dom";
import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./containers/Home/Home"; 
import Signup from "./containers/Signup/Signup";
import Signin from "./containers/Signin/Signin";
import Navbar from "./components/Navbar/Navbar"
import PrivateRoute from './components/HOC/privateRoute'
import {  isUserLogedIn,getIntialData } from "./actions";
import Orders_Page from "./containers/Orders_Page/Orders_Page";
import products_page from "./containers/products_page/products_page";
import Category from "./containers/Category/Category";
import NewPage from "./containers/NewPage/NewPage";

const App = () => {

  const dispatch = useDispatch();
  


  let auth = useSelector((state) => state.auth);
  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLogedIn());
    }
    if(auth.authenticate){
    dispatch(getIntialData())
    }
  }, [auth.authenticate]);
  return (
    <>
      <Navbar/>
        <Switch>
          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/home"  component={Home} />
          <PrivateRoute path="/page"  component={NewPage} />
          <PrivateRoute path="/orders"  component={Orders_Page} />
          <PrivateRoute path="/products"  component={products_page} />
          <PrivateRoute path="/category"  component={Category} />


          <Route path="/Signup" component={Signup} />
          <Route path="/Signin" component={Signin} />
        </Switch>
    </>
  );
};

export default App;
