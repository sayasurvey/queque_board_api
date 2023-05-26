import express from "express";
const router = express.Router();
const { BoardController } = require("../../api/controller/BoardController");

const boardContext = new BoardController();

router.use("/boards", boardContext.getBoards);
router.use("/board", boardContext.postBoard);
router.use("/board/:id", boardContext.postBoard);
router.use("/board/:id", boardContext.deleteBoard);

module.exports = router;
