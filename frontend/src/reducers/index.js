const DEFAULT_ACCOUNT = {
  loggedIn: false,
  id: null,
  message: "",
  user: "",
};

const account = (state = DEFAULT_ACCOUNT, action) => {
  switch (action.type) {
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        message: action.message,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loggedIn: action.loggedIn,
        id: action.userId,
        user: action.userName,
        message: action.message,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        loggedIn: false,
        id: action.userId,
        user: action.userName,
        message: action.message,
      };
    case "AUTHENTICATED_SUCCESS":
      return {
        ...state,
        loggedIn: action.loggedIn,
        id: action.userId,
        user: action.userName,
      };
    case "SET_USER":
      return {
        ...state,
        id: action.userId,
        user: action.userName,
        message: action.message,
      };
    case "ERROR":
      return {
        ...state,
        message: action.error,
      };
    default:
      return state;
  }
};

export default account;
