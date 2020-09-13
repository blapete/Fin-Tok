import axios from "axios";
import { STOCK_INFO, YAHOO } from "./types";

export const accountStocksRequest = ({
  method,
  endpoint,
  data,
  REQUEST_TYPE,
  ERROR_TYPE,
  SUCCESS_TYPE,
}) => async (dispatch) => {
  dispatch({ type: REQUEST_TYPE });
  try {
    const stocksData = await axios({
      method: method,
      url: endpoint,
      data: data,
    });
    console.log("stocksdataresponseeeeeeeee:", stocksData);
    let favoritesArray;
    if (stocksData.data.favorites) {
      if (
        !stocksData.data.favorites.length &&
        stocksData.data.message === "success - favorites found"
      ) {
        console.log(stocksData);
        return { message: "You have not added any to favorites" };
      }
      if (!stocksData.data.favorites.length) {
        return dispatch({
          type: YAHOO.RESET,
        });
      }
      favoritesArray = stocksData.data.favorites;
      let parsedArray = [];
      for (let i = 0; i < favoritesArray.length; i++) {
        let fixed = JSON.parse(favoritesArray[i]);
        parsedArray.push(fixed);
      }
      let object = {
        message: stocksData.data.message,
        favorites: parsedArray,
      };
      return dispatch({
        type: SUCCESS_TYPE,
        ...object,
      });
    }
    let object = new Object();
    object.message = stocksData.data.message;
    return dispatch({
      type: SUCCESS_TYPE,
      ...object,
    });
  } catch (error) {
    return dispatch({
      type: ERROR_TYPE,
      message: error.response.data.message,
    });
  }
};

export const addFavorite = ({ companyName, user, symbol, flag }) =>
  accountStocksRequest({
    method: "post",
    endpoint: "/fav/add",
    data: {
      companyName,
      user,
      symbol,
      flag,
    },
    REQUEST_TYPE: STOCK_INFO.REQUEST,
    ERROR_TYPE: STOCK_INFO.REQUEST_ERROR,
    SUCCESS_TYPE: STOCK_INFO.REQUEST_SUCCESS,
  });

export const allFavorites = ({ username }) =>
  accountStocksRequest({
    method: "post",
    endpoint: "/fav/all",
    data: {
      username,
    },
    REQUEST_TYPE: STOCK_INFO.REQUEST,
    ERROR_TYPE: STOCK_INFO.REQUEST_ERROR,
    SUCCESS_TYPE: STOCK_INFO.REQUEST_FAV_ALL_SUCCESS,
  });

export const removeFavorite = ({ id, user }) => {
  let params = `${id}|${user}`;
  return accountStocksRequest({
    method: "delete",
    endpoint: "/fav/remove/" + params,
    data: undefined,
    REQUEST_TYPE: STOCK_INFO.REQUEST,
    ERROR_TYPE: STOCK_INFO.REQUEST_ERROR,
    SUCCESS_TYPE: STOCK_INFO.REQUEST_REMOVED_SUCCESS,
  });
};

export const reset = () => async (dispatch) => {
  dispatch({
    type: STOCK_INFO.RESET,
  });

  dispatch({
    type: YAHOO.RESET,
  });
};
