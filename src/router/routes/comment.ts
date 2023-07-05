import express from "express";
const router = express.Router();
const { CommentController } = require("../../api/controller/CommentController");
const {
  commentCreateRule,
  commentUpdateRule,
} = require("../../api/handler/rules/comment.ts");
const { validateError } = require("../../api/handler/rules/validateError");

const commentContext = new CommentController();
console.log('comment');
router.post("board/:id/comment", commentCreateRule, validateError, commentContext.postComment);
router.get("board/:boardId/comment/:commentId", commentContext.showComment);
router.put("board/:boardId/comment/:commentId", commentUpdateRule, validateError, commentContext.putComment);
router.delete("board/:boardId/comment/:commentId", commentContext.deleteComment);

module.exports = router;
