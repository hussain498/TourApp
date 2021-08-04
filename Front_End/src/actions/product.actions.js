import axiosInstance from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
  return async (dispatch) => {
    const res = await axiosInstance.get(`/products/${slug}`);
    if (res.status === 200) {
      dispatch({
        type: productConstants.GET_PRODUCT_BY_SLUG,
        payload: res.data,
      });
    }
  };
};
export const getProductsPage = (payload) => {
  return async (dispatch) => {
    const { cid, type } = payload;
    const res = await axiosInstance.get(`/page/${cid}/${type}`);
    console.log(res);
    // if (res.status === 200) {
    //   dispatch({
    //     type: productConstants.GET_PRODUCT_BY_SLUG,
    //     payload: res.data,
    //   });
    // }
  };
};

export const getProductsDetailById = (payload) => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_PRODUCT_DETAIL_BY_ID_REQUEST });
    let res;
    try {
      const { productId } = payload.params;
      res = await axiosInstance.get(`/product/${productId}`);
      dispatch({
        type: productConstants.GET_PRODUCT_DETAIL_BY_ID_SUCCESS,
        payload: { productDetails: res.data.product }, 
      });
    } catch (error) {
      dispatch({
        type: productConstants.GET_PRODUCT_DETAIL_BY_ID_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
