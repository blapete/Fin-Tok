const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routing");
const db = require("./models");
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
} else {
  app.use(express.static("frontend/public"));
}
app.use(routes);
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./frontend/build/index.html"));
});

const port = process.env.PORT || 8080;

db.sequelize.sync({ force: true }).then(function () {
  app.listen(port, () => console.log(`listening on port ${port}`));
});
