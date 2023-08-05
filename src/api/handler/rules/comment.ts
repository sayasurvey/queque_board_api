import { check, body } from "express-validator";

export const commentCreateRule = [
  check("content")
    .not()
    .isEmpty()
    .withMessage("コメントを入力してください")
    .isLength({ max: 255 })
    .withMessage("コメントは255文字以内で入力してください"),
];

export const commentUpdateRule = [
  check("content")
    .not()
    .isEmpty()
    .withMessage("コメントを入力してください")
    .isLength({ max: 255 })
    .withMessage("コメントは255文字以内で入力してください"),
];
