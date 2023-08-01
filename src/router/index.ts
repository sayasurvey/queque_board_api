import express from "express";
const router = express.Router();

router.use("", require("./routes/hello"));
router.use("", require("./routes/auth"));
router.use("", require("./routes/board"));
router.use("", require("./routes/user"));
router.use("", require("./routes/bookmark"));
router.use("", require("./routes/comment"));

module.exports = router;
