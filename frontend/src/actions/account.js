import axios from "axios";

export const setAuthenticatedAction = () => async (dispatch, getState) => {
  try {
    const res = await axios.post("/api/user/signup", {
      username: "pete",
      email: "pjblank2@gmail.com",
      password: "circus",
      confirmpassword: "circus",
    });
    console.log("res", res);
  } catch (error) {
    console.log("error:", error);
    console.log(Object.keys(error), error.response);
  }
};
