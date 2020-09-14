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
    const yahooResponse = await axios({
      method: method,
      url: endpoint,
      data: data,
    });
    let yahooData = {
      data: yahooResponse.data.data,
      message: yahooResponse.data.message,
    };
    return dispatch({
      type: SUCCESS_TYPE,
      ...yahooData,
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
