import axios from "axios";
import { ACCOUNT_STOCKS, CLEAR } from "./types";

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
    const accountStocksResponse = await axios({
      method: method,
      url: endpoint,
      data: data,
    });
    let accountStocksArray;
    // this if block is for removeFavorite & allFavorites action
    if (accountStocksResponse.data.favorites) {
      // if the request is sent for account stocks & the user has none
      if (
        !accountStocksResponse.data.favorites.length &&
        accountStocksResponse.data.message === "success - favorites found"
      ) {
        return { message: "You have not added any to favorites" };
      }
      // if the user removed the last account stock they have, clear yahoo store
      if (
        !accountStocksResponse.data.favorites.length ||
        accountStocksResponse.data.message === "removed item"
      ) {
        dispatch({
          type: CLEAR.YAHOO,
        });
      }
      // response account stocks is in json => parse
      accountStocksArray = accountStocksResponse.data.favorites;
      let parsedStocks = [];
      for (let i = 0; i < accountStocksArray.length; i++) {
        let fixed = JSON.parse(accountStocksArray[i]);
        parsedStocks.push(fixed);
      }
      let accountStocksData = {
        message: accountStocksResponse.data.message,
        favorites: parsedStocks,
      };
      return dispatch({
        type: SUCCESS_TYPE,
        ...accountStocksData,
      });
    }
    // this logic is for addFavorite action
    let accountStocksData = {
      message: accountStocksResponse.data.message,
    };
    return dispatch({
      type: SUCCESS_TYPE,
      ...accountStocksData,
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
    REQUEST_TYPE: ACCOUNT_STOCKS.REQUEST,
    ERROR_TYPE: ACCOUNT_STOCKS.REQUEST_ERROR,
    SUCCESS_TYPE: ACCOUNT_STOCKS.REQUEST_ADD_SUCCESS,
  });

export const removeFavorite = ({ id, user }) => {
  let params = `${id}|${user}`;
  return accountStocksRequest({
    method: "delete",
    endpoint: "/fav/remove/" + params,
    data: undefined,
    REQUEST_TYPE: ACCOUNT_STOCKS.REQUEST,
    ERROR_TYPE: ACCOUNT_STOCKS.REQUEST_ERROR,
    SUCCESS_TYPE: ACCOUNT_STOCKS.REQUEST_DELETE_SUCCESS,
  });
};

export const allFavorites = ({ username }) =>
  accountStocksRequest({
    method: "post",
    endpoint: "/fav/all",
    data: {
      username,
    },
    REQUEST_TYPE: ACCOUNT_STOCKS.REQUEST,
    ERROR_TYPE: ACCOUNT_STOCKS.REQUEST_ERROR,
    SUCCESS_TYPE: ACCOUNT_STOCKS.REQUEST_ALLSTOCKS_SUCCESS,
  });

export const reset = () => async (dispatch) => {
  dispatch({
    type: CLEAR.ACCOUNT_STOCKS,
  });
  dispatch({
    type: CLEAR.YAHOO,
  });
};
