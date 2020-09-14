import requestStates from "./request";
import { YAHOO } from "../actions/types";

const DEFAULT_YAHOO_DATA = {
  top_stocks: [],
  stock_quote: {},
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
        stock_quote: action.data,
        message: action.message,
      };
    case YAHOO.REQUEST_TOPGAINERS_SUCCESS:
      return {
        ...state,
        status: requestStates.success,
        top_stocks: action.data,
      };
    case YAHOO.RESET:
      return {
        ...state,
        stock_quote: {},
        message: "",
      };
    default:
      return state;
  }
};

export default yahoo;
