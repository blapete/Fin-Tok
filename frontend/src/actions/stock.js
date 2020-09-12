import axios from "axios";
import { STOCK_INFO } from "./types";

export const stockQuoteAction = ({ data }) => async (dispatch) => {
  try {
    const res = await axios.post("/stock/quote", { data });
    console.log("stock res", res);
    return dispatch({
      type: STOCK_INFO.REQUEST_QUOTE_SUCCESS,
      data: res.data,
    });
  } catch (error) {
    console.log(Object.keys(error), error.response);
    return dispatch({
      type: STOCK_INFO.REQUEST_ERROR,
      message: error.response.data.message,
    });
  }
};

export const topStockAction = () => async (dispatch) => {
  try {
    const res = await axios.get("/stock/topstocks");

    console.log("top stock res", res);
    return dispatch({
      type: STOCK_INFO.REQUEST_TOPSTOCKS_SUCCESS,
      data: res.data.data,
    });
  } catch (error) {
    console.error(error);
    return dispatch({
      type: STOCK_INFO.REQUEST_ERROR,
      message: error.response.data.message,
    });
  }
};

export const resetAction = () => async (dispatch) => {
  dispatch({
    type: STOCK_INFO.RESET,
  });
};
