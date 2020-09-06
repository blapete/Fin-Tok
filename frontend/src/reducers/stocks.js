import { ACCOUNT } from "../actions/types";
import requestStates from "./request";

const DEFAULT_ACCOUNT = { placeholder: false };

const account = (state = DEFAULT_ACCOUNT, action) => {
  switch (action.type) {
    case ACCOUNT.FETCH:
      return { ...state, status: requestStates.requesting };
    default:
      return state;
  }
};

export default account;
