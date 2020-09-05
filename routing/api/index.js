const router = require("express").Router();
const userRoutes = require("./account");

router.use("/user", userRoutes);

module.exports = router;
