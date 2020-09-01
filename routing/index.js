const router = require("express").Router();
const apiRoutes = require("./api");

//api router
router.use("/api", apiRoutes);

module.exports = router;
