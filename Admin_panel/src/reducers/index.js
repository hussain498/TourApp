import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import userReducer from "./user.signin.reducer";
import catagory_reducer from "./catagory.reducer";
import order_reducer from "./order.reducer";
import product_reducer from "./product.reducer";
import Page_reducer from "./page.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  category: catagory_reducer,
  product: product_reducer,
  order: order_reducer,
  page: Page_reducer,
});

export default rootReducer;
