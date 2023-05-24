import express from "express";
const router = express.Router();

router.use("", require("./routes/hello"));

module.exports = router;
