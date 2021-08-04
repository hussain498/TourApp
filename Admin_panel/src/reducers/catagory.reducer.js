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
    case categoryConstants.UPDATE_CATEGORY_REQUEST:
      state = {
        ...state,
        loading:true
      };
      break;
    case categoryConstants.UPDATE_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading:false
      };
      break;
    case categoryConstants.UPDATE_CATEGORY_FAILURE:
      state = {
        ...state,
        loading:false,
        error:action.payload.error
      };
      break;
      case categoryConstants.DELETE_CATEGORY_REQUEST:
        state = {
          ...state,
          loading:true
        };
        break;
      case categoryConstants.DELETE_CATEGORY_SUCCESS:
        state = {
          ...state,
          loading:false
        };
        break;
      case categoryConstants.DELETE_CATEGORY_FAILURE:
        state = {
          ...state,
          loading:false,
          error:action.payload.error
        };
        break;
  }
  return state;
};
