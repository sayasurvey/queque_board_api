import express from "express";
const router = express.Router();
import { BookmarkController } from "../../api/controller/BookMarkController";
import tokenVerify from "../../middleware/tokenVerify";

const bookmarkContext = new BookmarkController();

router.get("/user/:user_id/bookmark", tokenVerify, bookmarkContext.getUserBookmark);
router.post("/user/:user_id/bookmark", tokenVerify, bookmarkContext.postBookmark);
router.delete(
  "/user/:user_id/bookmark/:bookmark_id",
  tokenVerify,
  bookmarkContext.deleteBookmark
);

module.exports = router;