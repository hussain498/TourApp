import { seachConstants } from "./constants";
import axios from "../helpers/axios";

export const searchItems = (searchItem) => {
  return async (dispatch) => {
    dispatch({ type: seachConstants.GET_SEARCH_ITEM_REQUEST });
    const res = await axios.post(`/search?q=${searchItem}`);
    if (res.status === 200) {
      const { data } = res.data;
      dispatch({
        type: seachConstants.GET_SEARCH_ITEM_SUCCESS,
        payload: { data },
      });
      return true;
    } else {
      // console.log(res.data);
    }
  };
};
