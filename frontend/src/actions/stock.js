import axios from "axios";
import { STOCK_INFO } from "./types";

export const stockQuoteAction = () => async (dispatch) => {
  try {
    const res = await axios.get("/stock/quote");
    console.log("stock trending res", res);
  } catch (error) {
    console.error(error);
  }
};

export const topStockAction = () => async (dispatch) => {
  try {
    const res = await axios.get("/stock/topstocks");

    console.log("top stock res", res);
    return dispatch({
      type: STOCK_INFO.REQUEST_TOPSTOCKS_SUCCESS,
      message: res.data.message,
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
