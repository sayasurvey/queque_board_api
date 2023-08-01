import express from "express";
const router = express.Router();
const { CommentController } = require("../../api/controller/CommentController");
const tokenVerify = require("../../middleware/tokenVerify");
const {
  commentCreateRule,
  commentUpdateRule,
} = require("../../api/handler/rules/comment.ts");
const { validateError } = require("../../api/handler/rules/validateError");

const commentContext = new CommentController();

router.post("/board/:id/comment", tokenVerify, commentCreateRule, validateError, commentContext.postComment); 
router.put("/board/:boardId/comment/:commentId", tokenVerify, commentUpdateRule, validateError, commentContext.putComment);
router.delete("/board/:boardId/comment/:commentId", tokenVerify, commentContext.deleteComment);

module.exports = router;
