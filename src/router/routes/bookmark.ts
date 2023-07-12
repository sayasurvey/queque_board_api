import express from "express";
const router = express.Router();
import { BookmarkController } from "../../api/controller/BookMarkController";

const bookmarkContext = new BookmarkController();

router.get("/user/:user_id/bookmark", bookmarkContext.getUserBookmark);
router.post("/user/:user_id/bookmark", bookmarkContext.postBookmark);
router.delete(
  "/user/:user_id/bookmark/:bookmark_id",
  bookmarkContext.deleteBookmark
);

module.exports = router;
