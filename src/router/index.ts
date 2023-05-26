import express from "express";
const router = express.Router();

router.use("", require("./routes/hello"));
router.use("", require("./routes/board"));

module.exports = router;
