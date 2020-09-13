import { combineReducers } from "redux";
import account from "./account";
import stocks from "./stocks";
import yahoo from "./yahoo";

export default combineReducers({
  account,
  stocks,
  yahoo,
});
