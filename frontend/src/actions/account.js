import axios from "axios";

export const getAuthAction = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("/api/user/auth");
    console.log("auth res", res);
  } catch (error) {
    console.log("error:", error);
    console.log(Object.keys(error), error.response);
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
    console.log("error:", error);
    console.log(Object.keys(error), error.response);
  }
};
