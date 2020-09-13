import axios from "axios";
import { ACCOUNT } from "./types";

export const accountRequest = ({
  method,
  endpoint,
  data,
  REQUEST_TYPE,
  ERROR_TYPE,
  SUCCESS_TYPE,
}) => async (dispatch) => {
  dispatch({ type: REQUEST_TYPE });
  try {
    let response;
    if (data) {
      response = await axios({
        method: method,
        url: endpoint,
        data: data,
      });
    } else {
      response = await axios({
        method: method,
        url: endpoint,
      });
    }
    return dispatch({
      type: SUCCESS_TYPE,
      ...response.data,
    });
  } catch (error) {
    return dispatch({
      type: ERROR_TYPE,
      message: error.response.data.message,
    });
  }
};

export const signUp = ({ username, email, password, confirmPassword }) =>
  accountRequest({
    method: "post",
    endpoint: "/account/signup",
    data: {
      username,
      email,
      password,
      confirmPassword,
    },
    REQUEST_TYPE: ACCOUNT.REQUEST,
    ERROR_TYPE: ACCOUNT.REQUEST_ERROR,
    SUCCESS_TYPE: ACCOUNT.REQUEST_SIGNUP_SUCCESS,
  });

export const getAuthenticated = () =>
  accountRequest({
    method: "get",
    endpoint: "/account/auth",
    data: undefined,
    REQUEST_TYPE: ACCOUNT.REQUEST,
    ERROR_TYPE: ACCOUNT.REQUEST_ERROR,
    SUCCESS_TYPE: ACCOUNT.REQUEST_AUTHENTICATED_SUCCESS,
  });

export const login = ({ username, password }) =>
  accountRequest({
    method: "post",
    endpoint: "/account/login",
    data: {
      username,
      password,
    },
    REQUEST_TYPE: ACCOUNT.REQUEST,
    ERROR_TYPE: ACCOUNT.REQUEST_ERROR,
    SUCCESS_TYPE: ACCOUNT.REQUEST_SUCCESS,
  });

export const logoutAction = () =>
  accountRequest({
    method: "get",
    endpoint: "/account/logout",
    data: undefined,
    REQUEST_TYPE: ACCOUNT.REQUEST,
    ERROR_TYPE: ACCOUNT.REQUEST_ERROR,
    SUCCESS_TYPE: ACCOUNT.REQUEST_LOGOUT_SUCCESS,
  });
