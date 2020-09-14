import axios from "axios";
import { YAHOO } from "./types";

export const yahooRequest = ({
  method,
  endpoint,
  data,
  REQUEST_TYPE,
  ERROR_TYPE,
  SUCCESS_TYPE,
}) => async (dispatch) => {
  dispatch({ type: REQUEST_TYPE });
  try {
    const yahooData = await axios({
      method: method,
      url: endpoint,
      data: data,
    });
    let response = new Object();
    response.data = yahooData.data.data;
    response.message = yahooData.data.message;
    return dispatch({
      type: SUCCESS_TYPE,
      ...response,
    });
  } catch (error) {
    return dispatch({
      type: ERROR_TYPE,
      message: error.response.data.message,
    });
  }
};

export const quote = ({ data }) =>
  yahooRequest({
    method: "post",
    endpoint: "/stock/quote",
    data: {
      data,
    },
    REQUEST_TYPE: YAHOO.REQUEST,
    ERROR_TYPE: YAHOO.REQUEST_ERROR,
    SUCCESS_TYPE: YAHOO.REQUEST_QUOTE_SUCCESS,
  });

export const topWatched = () =>
  yahooRequest({
    method: "get",
    endpoint: "/stock/topstocks",
    data: undefined,
    REQUEST_TYPE: YAHOO.REQUEST,
    ERROR_TYPE: YAHOO.REQUEST_ERROR,
    SUCCESS_TYPE: YAHOO.REQUEST_TOPGAINERS_SUCCESS,
  });
