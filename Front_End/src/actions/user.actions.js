import { cartConstants, userConstants } from "./constants";
import axios from "../helpers/axios";

export const getAddress = () => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/user/getaddress`);
      dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST });
      if (res.status === 200) {
        const {
          userAddress: { address },
        } = res.data;
        dispatch({
          type: userConstants.GET_USER_ADDRESS_SUCCESS,
          payload: { address },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
// export const settingAuthStatetoNull =()=>{
//   return dispatch =>{
//   return new Promise((resolve, reject) => {
//     dispatch({
//       type: authConstants.RESET_STATE,
//     });

//     resolve()
//   });
//   }
// }
export const addAddress = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/user/address/create`, { payload });
      dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST });
      if (res.status === 201) {
        const {
          address: { address },
        } = res.data;

        const result = await dispatch({
          type: userConstants.ADD_USER_ADDRESS_SUCCESS,
          payload: { address },
        });
        return result;
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ADDRESS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addOrder = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/addOrder`, payload);
      dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST });
      if (res.status === 201) {
        console.log(res);
        const { order } = res.data;
        dispatch({
          type: cartConstants.RESET_CART,
        });
        dispatch({
          type: userConstants.ADD_USER_ORDER_SUCCESS,
          payload: { order },
        });
        // const {
        //   address: { address },
        // } = res.data;
        // dispatch({
        //   type: userConstants.ADD_USER_ADDRESS_SUCCESS,
        //   payload: { address },
        // });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.ADD_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/getOrders`);
      dispatch({ type: userConstants.GET_USER_ORDER_REQUEST });
      if (res.status === 200) {
        const { orders } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_SUCCESS,
          payload: { orders },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

// single order with complete info and delivery location
export const getOrder = (payload) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/getOrder`, payload);
      dispatch({ type: userConstants.GET_USER_ORDER_DETAILS_REQUEST });
      if (res.status === 200) {
        console.log(res);
        const { order } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
          payload: { order },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteOrder = (order_id) => {
  return async (dispatch) => {
    const res = await axios.post("/deleteOrder", { _id: order_id });
    console.log(...order_id);
    // console.log(res);
    if (res.status === 200) {
      window.location.reload(false);
    }else{
    }
  };
};

// export const addRating_Review  = (payload) => {
//   return async (dispatch) => {
//       const res = await axios.post(`/reviews/update`, payload);
//       // dispatch({ type: userConstants.ADD_REVIEW_RATING_REQUEST });
//       console.log(res)
//       if (res.status === 200) {
//         // console.log(res);
//         // const { order } = res.data;
//         // dispatch({
//         //   type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
//         //   payload: { order },
//         // });
//       } else {
//         // const { error } = res.data;
//         // dispatch({
//         //   type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
//         //   payload: { error },
//         // });
//       }

//   };
// };
