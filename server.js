const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
// const morgan = require("morgan");
const routes = require("./routing");
const app = express();
// app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routes);

app.use(express.static("dist"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../src/index.html"));
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`listening on port ${port}`));
