import axiosInstance from "../helpers/axios";
import { productConstants } from "./constants";

export const getIntialData = (pageNumber) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_ALL_PRODUCT_REQUEST });
    const res = await axiosInstance.get(`/initialData?page=${pageNumber}`);
    const { Products,totalPages } = res.data;
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_ALL_PRODUCT_SUCCESS,
        payload: { Products,totalPages},
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
