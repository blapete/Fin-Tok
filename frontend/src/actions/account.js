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
    const res = await axios({
      method: method,
      url: endpoint,
      data: data,
    });
    console.log("the reponse: ", res);
    dispatch({
      type: SUCCESS_TYPE,
      message: res.data.message,
    });
  } catch (error) {
    dispatch({
      type: ERROR_TYPE,
      message: error.response.data.message,
    });

    console.log(Object.keys(error), error.response);
  }
};

export const signUpAction = ({ username, email, password, confirmPassword }) =>
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

export const getAuthAction = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("/account/auth");
    console.log("auth res", res);
  } catch (error) {
    dispatch({
      type: ACCOUNT.REQUEST_ERROR,
      message: error.response.data.message,
    });
    console.error(Object.keys(error), error.response);
  }
};

// export const signUpAction = ({
//   username,
//   email,
//   password,
//   confirmPassword,
// }) => async (dispatch) => {
//   dispatch({ type: ACCOUNT.REQUEST });
//   try {
//     const res = await axios.post("/account/signup", {
//       username,
//       email,
//       password,
//       confirmPassword,
//     });
//     dispatch({
//       type: ACCOUNT.REQUEST_SIGNUP_SUCCESS,
//       message: res.data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: ACCOUNT.REQUEST_ERROR,
//       message: error.response.data.message,
//     });
//   }
// };

export const loginAction = ({ username, password }) => async (
  dispatch,
  getState
) => {
  try {
    const res = await axios.post("/account/login", {
      username,
      password,
    });
    console.log("login res", res);
  } catch (error) {
    console.log(Object.keys(error), error.response);
  }
};

export const logoutAction = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("/account/logout");
    console.log("logout response", res);
  } catch (error) {
    console.error(Object.keys(error), error.response);
  }
};
