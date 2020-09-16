const app = require("../app");
const db = require("../database/models");

//port
const port = process.env.PORT || 8080;

//sync database and start server
db.sequelize.sync().then(function () {
  app.listen(port, () => console.log(`listening on port ${port}`));
});

// {
//   force: true;
// }
