import axios from "axios";
import { STOCK_INFO } from "./types";

export const addFavoriteAction = ({
  companyName,
  user,
  symbol,
  flag,
}) => async (dispatch) => {
  if (flag) {
    dispatch({
      type: STOCK_INFO.RESET,
    });
  }
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
    console.log("Peter Blank:", resArray);
    if (resArray.length < 1) {
      return { message: "You have not added any to favorites" };
    }
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
  } catch (error) {
    console.error("errr fav all", error);
    return dispatch({
      type: STOCK_INFO.REQUEST_ERROR,
      message: error.response.data.message,
    });
  }
};

export const RemoveItemAction = ({ id, user }) => async (dispatch) => {
  let params = `${id}|${user}`;
  try {
    const res = await axios.delete("/fav/remove/" + params);

    console.log("remove fav res", res);
  } catch (error) {
    console.error("errr", error);
  }
};
