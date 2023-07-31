import express from "express";
const router = express.Router();
const { BoardController } = require("../../api/controller/BoardController");
const tokenVerify = require("../../middleware/tokenVerify");
const {
  boardCreateRule,
  boardUpdateRule,
} = require("../../api/handler/rules/board.ts");
const { validateError } = require("../../api/handler/rules/validateError");

const boardContext = new BoardController();

router.get("/boards", tokenVerify, boardContext.allBoard);
router.post("/board", tokenVerify, boardCreateRule, validateError, boardContext.postBoard);
router.get("/board/:id", tokenVerify, boardContext.showBoard);
router.put("/board/:id", tokenVerify, boardUpdateRule, validateError, boardContext.putBoard);
router.delete("/board/:id", tokenVerify, boardContext.deleteBoard);

module.exports = router;
