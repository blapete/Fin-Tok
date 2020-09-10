import axios from "axios";
import { STOCK_INFO } from "./types";

export const addFavoriteAction = ({ companyName, user, symbol }) => async (
  dispatch
) => {
  console.log(companyName, user);
  try {
    const res = await axios.post("/fav/add", {
      companyName,
      user,
      symbol,
    });

    console.log("add fav res", res);
  } catch (error) {
    console.error("errr", error);
  }
};

export const getFavoritesAction = ({ username }) => async (dispatch) => {
  try {
    const res = await axios.post("/fav/all", { username });
    console.log("get favorites response:", res);
    let resArray = res.data.favorites;
    let parsedArray = [];
    for (let i = 0; i < resArray.length; i++) {
      let fixed = JSON.parse(resArray[i]);
      parsedArray.push(fixed);
    }
    console.log("parsed array:", parsedArray);
    let payload = {
      message: res.data.message,
      favorites: parsedArray,
    };
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
