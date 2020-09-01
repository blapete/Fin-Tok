import { createStore, compose, applyMiddleware } from "redux";
import accountReducer from "./reducers";
import thunk from "redux-thunk";

//redux extension
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  accountReducer,
  composeEnhancer(applyMiddleware(thunk))
);
