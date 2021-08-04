import { combineReducers } from "redux";
import catagory_reducer from "./catagory.reducer";
import product_reducer from "./product.reducer";
import auth_reducer from "./auth.reducer";
import cart_reducer from "./cart.reducers";
import user_reducer from './user.reducer'
import initialData_reducer from './InitialData.reducer'

const rootReducer = combineReducers({
  category: catagory_reducer,
  product: product_reducer,
  auth: auth_reducer,
  cart: cart_reducer,
  user:user_reducer,
  initialData:initialData_reducer
});

export default rootReducer;
