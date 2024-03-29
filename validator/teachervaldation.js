const { body, param, query } = require("express-validator");
const Teacher = require("../model/Teacher");

exports.insertValidations = [
  body("name")
    .isString()
    .withMessage("Name Should Be String")
    .isAlpha("en-US")
    .withMessage(
      "Name Should Be Written In English With No Numbers or Special Characters"
    )
    .isLength({ min: 3 })
    .withMessage("Name Should Be at least 3 letters long"),
  body("password")
    .isStrongPassword()
    .withMessage(
      "Password should be at least 8 characters with mix of upper and lower case letters , numbers and special characters"
    ),
  body("email").isEmail().withMessage("Should be a Valid Email"),
];

exports.updateValidations = [
  body("name")
    .optional()
    .isString()
    .withMessage("Name Should Be String")
    .isAlpha("en-US")
    .withMessage(
      "Name Should Be Written In English With No Numbers or Special Characters"
    )
    .isLength({ min: 3 })
    .withMessage("Name Should Be at least 3 letters long"),
  body("password")
    .optional()
    .isStrongPassword()
    .withMessage(
      "Password should be at least 8 characters with mix of upper and lower case letters , numbers and special characters"
    ),
  body("email").optional().isEmail().withMessage("Should be a Valid Email"),
];
