import { authConstants, userContants } from "../actions/constants";

const initState = {
  token: null,
  user: {
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
  },
  authenticate: false,
  authenticating: false,
  sighningup:false,
  loading: false,
  error: null,
  message:""
};

export default (state = initState, action) => {
  switch (action.type) {
    
    case authConstants.RESET_STATE:
      state = {
        ...state,

      };
      break;
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;
      case authConstants.LOGIN_FAILURE:
        state = {
          ...state,
          error: action.payload.error,
          authenticating: false,
        };
        break;
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.message,
        loading: false,
      };
      break;
      case authConstants.RESET_ERROR :
        state = {
          ...state,
          error: null,
          loading: false,
        };
        break;
    case userContants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userContants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        loading: false,
        sighningup:true
      };
      break;
    case userContants.USER_REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        sighningup:false,
        error: action.payload.error,
      }; 
      break;
  }
  return state;
};
