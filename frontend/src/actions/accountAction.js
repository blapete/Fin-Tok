import axios from "axios";

export const setAuthenticatedAction = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("/api/test");
    dispatch({ type: "AUTHENTICATED_SUCCESS", loggedIn: false });
    console.log("res", res);
  } catch (error) {
    console.log("error:", error);
    console.log(Object.keys(error), error.response);
    dispatch({
      type: "ERROR",
      loggedIn: false,
      message: "",
    });
  }
};
