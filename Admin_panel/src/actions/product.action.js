import axiosInstance from "../helpers/axios";
// import { categoryConstants } from "./constants";

export const addProduct = (form) => {
    return async (dispatch) => {
        console.log(form)
    //   dispatch({ type: categoryConstants.CREATE_CATEGORY_REQUEST });
      const res = await axiosInstance.post("/product/create", form);
      console.log(res)

  }
  };
    