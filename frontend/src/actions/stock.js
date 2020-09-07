import axios from "axios";

export const stockQuoteAction = () => async (dispatch) => {
  try {
    const res = await axios.get("/stock/quote");
    console.log("stock trending res", res);
  } catch (error) {
    console.error(error);
  }
};

export const topStockAction = () => async (dispatch) => {
  try {
    const res = await axios.get("/stock/topstocks");
    console.log("top stock res", res);
  } catch (error) {
    console.error(error);
  }
};
