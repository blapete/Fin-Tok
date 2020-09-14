import requestStates from "./request";
import { STOCK_INFO } from "../actions/types";

const DEFAULT_STOCKS = {
  favorites: [],
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
    case STOCK_INFO.REQUEST_FAV_ALL_SUCCESS:
      return {
        ...state,
        status: requestStates.success,
        message: action.message,
        favorites: action.favorites,
      };
    case STOCK_INFO.REQUEST_REMOVED_SUCCESS:
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
