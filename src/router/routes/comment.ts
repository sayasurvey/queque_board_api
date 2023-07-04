import express from "express";
const router = express.Router();
const { commentController } = require("../../api/controller/CommentController");
const {
  commentCreateRule,
  commentUpdateRule,
} = require("../../api/handler/rules/comment.ts");
const { validateError } = require("../../api/handler/rules/validateError");

const commentContext = new commentController();

router.get("/comments", commentContext.allcomment);
router.post("/comment", commentCreateRule, validateError, commentContext.postcomment);
router.get("/comment/:id", commentContext.showcomment);
router.put("/comment/:id", commentUpdateRule, validateError, commentContext.putcomment);
router.delete("/comment/:id", commentContext.deletecomment);

module.exports = router;
