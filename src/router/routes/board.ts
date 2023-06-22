import express from "express";
const router = express.Router();
const { BoardController } = require("../../api/controller/BoardController");

const boardContext = new BoardController();

router.get("/boards", boardContext.allBoard);
router.post("/board", boardContext.postBoard);
router.get("/board/:id", boardContext.showBoard);
router.put("/board/:id", boardContext.putBoard);
router.delete("/board/:id", boardContext.deleteBoard);

module.exports = router;
