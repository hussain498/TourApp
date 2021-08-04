import { categoryConstants } from "../actions/constants";

const initState = {
  categories: [],
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
      state = { 
        ...state,
        categories: action.payload.categories,
      };
      break;
    case categoryConstants.CREATE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case categoryConstants.CREATE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case categoryConstants.CREATE_CATEGORY_FAILURE:
      state = {
        ...initState,
      };
      break;
  }
  return state;
};
