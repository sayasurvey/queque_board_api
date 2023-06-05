import { check, body } from "express-validator";
import { prismaContext } from "../../../lib/prismaContext";

export const authRegisterRule = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("name mast be at least 3 characters")
    .isLength({ max: 255 })
    .withMessage("name mast be at largest 3 characters"),
  check("email")
    .not()
    .isEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email")
    .custom(async (value) => {
      const existedUser = await prismaContext.user.findUnique({
        where: {
          email: value,
        },
      });
      if (existedUser) {
        throw new Error("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 5 })
    .withMessage("password mast be at least 5 characters")
    .isLength({ max: 50 })
    .withMessage("name mast be at largest 50 characters")
];

export const authLoginRule = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .not()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 5 })
    .withMessage("password mast be at least 5 characters")
    .isLength({ max: 50 })
    .withMessage("name mast be at largest 50 characters"),
];