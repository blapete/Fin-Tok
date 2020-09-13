import { STOCK_INFO } from "../actions/types";
import requestStates from "./request";

const DEFAULT_STOCKS = {
  top_stocks: [],
  favorites: [],
  stock_quote: {},
  message: "",
};

const stocks = (state = DEFAULT_STOCKS, action) => {
  switch (action.type) {
    case STOCK_INFO.REQUEST:
      return { ...state, status: requestStates.requesting };
    case STOCK_INFO.REQUEST_ERROR:
      return { ...state, status: requestStates.error, message: action.message };
    case STOCK_INFO.REQUEST_SUCCESS:
      return {
        ...state,
        status: requestStates.success,
        message: action.message,
      };
    case STOCK_INFO.REQUEST_TOPSTOCKS_SUCCESS:
      return {
        ...state,
        status: requestStates.success,
        top_stocks: action.data,
      };
    case STOCK_INFO.REQUEST_QUOTE_SUCCESS:
      return {
        ...state,
        status: requestStates.success,
        stock_quote: action.data,
        message: action.message,
      };
    case STOCK_INFO.REQUEST_REMOVED_SUCCESS:
      return {
        ...state,
        status: requestStates.success,
        message: action.message,
        favorites: action.favorites,
        stock_quote: {},
      };
    case STOCK_INFO.REQUEST_FAV_ALL_SUCCESS:
      return {
        ...state,
        status: requestStates.success,
        message: action.message,
        favorites: action.favorites,
      };
    case STOCK_INFO.RESET:
      return {
        ...state,
        stock_quote: {},
        message: "",
        favorites: [],
      };
    default:
      return state;
  }
};

export default stocks;
