import axiosInstance from "../helpers/axios";
import { categoryConstants, productConstants,orderConstants } from "./constants";

export const getIntialData = () => {
  return async (dispatch) => {
    const res = await axiosInstance.get("/initialData");
    const { categories, Products,orders  } = res.data;
    console.log(res.data)
    if (res.status === 200) {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
        payload: { categories }, 
      });
      dispatch({
        type: productConstants.GET_ALL_PRODUCT_SUCCESS,
        payload: { products:Products},
      }); 
      dispatch({
        type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
        payload: { orders },
      });
    } 
    // else {
    //   dispatch({
    //     type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
    //     payload: { error: res.data.error },
    //   });
    // }
  };
};
