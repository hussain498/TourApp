import axiosInstance from "../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategories = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST });
    const res = await axiosInstance.get("/category/getCatagory");
    const { categoriesList } = res.data;
    if (res.status === 200) {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
        payload: { categories: categoriesList },
      });
    } else {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
