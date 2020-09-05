import axios from "axios";

export const getAuthAction = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("/api/user/auth");
    console.log("auth res", res);
  } catch (error) {
    console.error(Object.keys(error), error.response);
  }
};

export const signUpAction = ({
  username,
  email,
  password,
  confirmPassword,
}) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/api/user/signup", {
      username,
      email,
      password,
      confirmPassword,
    });
    console.log("signup res", res);
  } catch (error) {
    console.log(Object.keys(error), error.response);
  }
};

export const loginAction = ({ username, password }) => async (
  dispatch,
  getState
) => {
  try {
    const res = await axios.post("/api/user/login", {
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
    const res = await axios.get("/api/user/logout");
    console.log("logout response", res);
  } catch (error) {
    console.error(Object.keys(error), error.response);
  }
};
