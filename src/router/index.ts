import express from "express";
const router = express.Router();
const authenticateUser = require("../middleware/authenticateUser");

router.use("", require("./routes/hello"));
router.use("", require("./routes/auth"));
router.use("", authenticateUser, require("./routes/board"));
router.use("", authenticateUser, require("./routes/user"));

module.exports = router;
