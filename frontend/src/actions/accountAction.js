import axios from "axios";

export const setAuthenticatedAction = () => async (dispatch, getState) => {
  try {
    const res = await axios.get("/api/test");
    console.log("res", res);
  } catch (error) {
    console.log("error:", error);
    console.log(Object.keys(error), error.response);
  }
};
