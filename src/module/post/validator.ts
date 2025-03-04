import { body } from "express-validator";

export default {
  createPost: [
    body("user_id")
      .notEmpty().withMessage("User id is required")
      .isInt().withMessage("Invalid user id"),
    body("title").notEmpty().withMessage("title is required"),
    body("body").notEmpty().withMessage("body is required"),
  ]
}