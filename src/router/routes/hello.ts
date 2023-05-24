import express from "express";
const router = express.Router();
const { HelloController } = require("../../api/controller/HelloController");

const helloContext = new HelloController();

router.use("/hello", helloContext.getHello);

module.exports = router;
