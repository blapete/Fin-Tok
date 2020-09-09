import axios from "axios";

export const addFavoriteAction = ({ companyName, user }) => async (
  dispatch
) => {
  console.log(companyName, user);
  try {
    const res = await axios.post("/fav/add", {
      companyName,
      user,
    });

    console.log("add fav res", res);
  } catch (error) {
    console.error("errr", error);
  }
};
