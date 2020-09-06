import { combineReducers } from "redux";
import account from "./account";
import stocks from "./stocks";

export default combineReducers({
  account,
  stocks,
});
