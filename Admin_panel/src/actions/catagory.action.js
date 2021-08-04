import axiosInstance from "../helpers/axios";
import { categoryConstants } from "./constants";
import { getIntialData } from "../actions";

// export const getAllCategories = () => {
//   return async (dispatch) => {
//     dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST });
//     const res = await axiosInstance.get("/category/getCatagory");
//     const { categoriesList } = res.data;
//     if (res.status === 200) {
//       dispatch({
//         type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
//         payload: { categories: categoriesList },
//       });
//     } else {
//       dispatch({
//         type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
//         payload: { error: res.data.error },
//       });
//     }
//   };
// };
export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.CREATE_CATEGORY_REQUEST });
    try {
      const res = await axiosInstance.post("/category/create", form);
      if (res.status === 201) {
        dispatch({
          type: categoryConstants.CREATE_CATEGORY_SUCCESS,
          payload: res.data.category,
        });
        return true;
      } else {
        dispatch({
          type: categoryConstants.CREATE_CATEGORY_FAILURE,
          payload: res.data.error,
        });
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export const updateCategories = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST });
    const res = await axiosInstance.post("/category/update", form);
    if (res.status === 201) {
      dispatch(getIntialData())
      dispatch({
        type: categoryConstants.UPDATE_CATEGORY_SUCCESS,
      });
    } else {
      const {error}= res.data
      dispatch({
        type: categoryConstants.UPDATE_CATEGORY_FAILURE,
        payload: {error},
      });
    }
  };
};

export const deleteCategories = (ids) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST });
    const res = await axiosInstance.post("/category/delete", {
      payload: {
        ids,
      },
    });
    if (res.status === 200) {
      dispatch(getIntialData())
      dispatch({
        type: categoryConstants.DELETE_CATEGORY_SUCCESS,
      });
    } else {
      const {error}= res.data
      dispatch({
        type: categoryConstants.DELETE_CATEGORY_FAILURE,
        payload: {error},
      });
    }
  };
};
