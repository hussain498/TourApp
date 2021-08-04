import { productConstants, seachConstants } from "../actions/constants";

const initState = {
  products: [],
  totalPages:"",
  loading: false,
  redirect:false
};

export default (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConstants.GET_ALL_PRODUCT_SUCCESS:
      state = {
        ...state,
        products: action.payload.Products,
        totalPages: action.payload.totalPages,
        loading: false,
      };
      break;
    case seachConstants.GET_SEARCH_ITEM_REQUEST:
      state = {
        ...state,
        loading: true,
        // redirect: true
      };
      break;

    case seachConstants.GET_SEARCH_ITEM_SUCCESS:
      state = {
        ...state,
        products: action.payload.data,
        totalPages: "",
        loading: false,
        // redirect:true

      };
      break;
  }
  return state;
};
