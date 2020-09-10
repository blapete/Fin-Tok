import axios from "axios";
import { STOCK_INFO } from "./types";

export const addFavoriteAction = ({ companyName, user }) => async (
  dispatch
) => {
  console.log(companyName, user);
  try {
    const res = await axios.post("/fav/add", {
      companyName,
      user,
    });

    console.log("add fav res", res);
  } catch (error) {
    console.error("errr", error);
  }
};

export const getFavoritesAction = ({ username }) => async (dispatch) => {
  try {
    const res = await axios.post("/fav/all", { username });
    let payload = res.data;
    return dispatch({
      type: STOCK_INFO.REQUEST_FAV_ALL_SUCCESS,
      ...payload,
    });
    console.log("all fav res", res);
  } catch (error) {
    console.error("errr fav all", error);
    return dispatch({
      type: STOCK_INFO.REQUEST_ERROR,
      message: error.response.data.message,
    });
  }
};
