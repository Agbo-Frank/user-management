import { body } from "express-validator";

export default {
  createAddress: [
    body("user_id")
      .notEmpty().withMessage("User id is required")
      .isInt().withMessage("Invalid user id"),
    body("street").notEmpty().withMessage("Street is required"),
    body("city").notEmpty().withMessage("city is required"),
    body("country").notEmpty().withMessage("country is required")
  ]
}