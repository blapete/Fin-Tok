const YAHOO_CREDENTIALS = {
  headers: {
    "x-rapidapi-host": process.env.rapidapi_host,
    "x-rapidapi-key": process.env.rapidapi_key,
    useQueryString: true,
  },
};

module.exports = { YAHOO_CREDENTIALS };
