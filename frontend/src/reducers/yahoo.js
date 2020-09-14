import requestStates from "./request";
import { YAHOO, CLEAR } from "../actions/types";

const DEFAULT_YAHOO_DATA = {
  top_gainers: [],
  quote: {},
  message: "",
};

const yahoo = (state = DEFAULT_YAHOO_DATA, action) => {
  switch (action.type) {
    case YAHOO.REQUEST:
      return { ...state, status: requestStates.requesting };
    case YAHOO.REQUEST_ERROR:
      return { ...state, status: requestStates.error, message: action.message };
    case YAHOO.REQUEST_QUOTE_SUCCESS:
      return {
        ...state,
        status: requestStates.success,
        quote: action.data,
        message: action.message,
      };
    case YAHOO.REQUEST_TOPGAINERS_SUCCESS:
      return {
        ...state,
        status: requestStates.success,
        top_gainers: action.data,
      };
    case CLEAR.YAHOO:
      return {
        ...state,
        quote: {},
        message: "",
      };
    default:
      return state;
  }
};

export default yahoo;
