import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "./containers/HomePage/Home";
import { Route, Switch } from "react-router-dom";
import ProductListPage from "./containers/ProductListPage/ProductListPage";
import Header from "./components/Header/Header";
import MenuHeader from "./components/MenuHeader/MenuHeader";
import { isUserLogedIn, UpdateCart, getIntialData } from "./actions";
import ProductDetailPage from "./containers/ProductDetailPage/ProductDetailPage";
import CartPage from "./containers/CartPage/CartPage";
import CheckoutPage from "./containers/CheckOutPage/CheckOutPage";
import OrderPage from "./containers/OrderPage/OrderPage";

const App = () => {
  const dispatch = useDispatch();

  let auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLogedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(UpdateCart()); 
  }, [auth.authenticate]);


  return (
    <div>
      <Header />
      {/* <MenuHeader /> */}
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/orders" exact component={OrderPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route
          path="/:productSlug/:productId/p"
          component={ProductDetailPage}
        />
        <Route path="/:slug" component={ProductListPage} />
      </Switch>
    </div>
  );
};

export default App;
