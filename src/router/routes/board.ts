import express from "express";
const router = express.Router();
const { BoardController } = require("../../api/controller/BoardController");
const {
  boardCreateRule,
  boardUpdateRule,
} = require("../../api/handler/rules/board.ts");
const { validateError } = require("../../api/handler/rules/validateError");

const boardContext = new BoardController();

router.get("/boards", boardContext.allBoard);
router.post("/board", boardCreateRule, validateError, boardContext.postBoard);
router.get("/board/:id", boardContext.showBoard);
router.put("/board/:id", boardUpdateRule, validateError, boardContext.putBoard);
router.delete("/board/:id", boardContext.deleteBoard);

module.exports = router;
