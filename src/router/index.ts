import express from "express";
const router = express.Router();
const authenticateUser = require("../middleware/authenticateUser");

router.use(authenticateUser);

router.use("", require("./routes/hello"));
router.use("", require("./routes/board"));
router.use("", require("./routes/user"));
router.use("", require("./routes/auth"));

module.exports = router;
