import axios from "axios";
import { STOCK_INFO } from "./types";

export const addFavoriteAction = ({
  companyName,
  user,
  symbol,
  flag,
}) => async (dispatch) => {
  console.log(companyName, user);
  try {
    const res = await axios.post("/fav/add", {
      companyName,
      user,
      symbol,
    });
    if (res.data.data.length && flag) {
      console.log("herehere", flag, res.data);
      let obj = new Object();
      obj.message = res.data.message;

      dispatch({
        type: STOCK_INFO.REQUEST_SUCCESS,
        ...obj,
      });
    }

    console.log("add fav res", res);
  } catch (error) {
    let obj = new Object();
    obj.message = error.response.data.message;
    return dispatch({
      type: STOCK_INFO.REQUEST_ERROR,
      ...obj,
    });
    console.log(Object.keys(error), error.response);
  }
};

export const getFavoritesAction = ({ username }) => async (dispatch) => {
  try {
    const res = await axios.post("/fav/all", { username });
    let resArray = res.data.favorites;
    if (resArray.length < 1) {
      return { message: "You have not added any to favorites" };
    }
    let parsedArray = [];
    for (let i = 0; i < resArray.length; i++) {
      let fixed = JSON.parse(resArray[i]);
      parsedArray.push(fixed);
    }
    let payload = {
      message: res.data.message,
      favorites: parsedArray,
    };
    return dispatch({
      type: STOCK_INFO.REQUEST_FAV_ALL_SUCCESS,
      ...payload,
    });
  } catch (error) {
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
