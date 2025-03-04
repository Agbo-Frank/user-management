import { body } from "express-validator";

export default {
  createUser: [
    body("email")
      .notEmpty().withMessage("email is required")
      .isEmail().withMessage("Invalid email address"),
    body("first_name").notEmpty().withMessage("First name is required"),
    body("last_name").notEmpty().withMessage("Last name is required")
  ]
}