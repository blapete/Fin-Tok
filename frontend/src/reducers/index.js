import { combineReducers } from "redux";
import account from "./account";
import stocks from "./accountStocks";
import yahoo from "./yahoo";

export default combineReducers({
  account,
  stocks,
  yahoo,
});
