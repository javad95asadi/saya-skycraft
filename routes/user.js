const express = require("express");
const { body } = require("express-validator");
const isAuth = require("../middlewares/verify-token");
const { validationResult } = require("express-validator");

const userController = require("../controllers/user");
const User = require("../models/user");

const router = express.Router();

router.get("/", isAuth, userController.getUsers);

router.post(
  "/add_users",
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isString()
      .withMessage("Email must be a string")
      .isEmail()
      .normalizeEmail()
      .withMessage("Invalid email address")
      .custom(async (value, { req }) => {
        const userDoc = await User.findOne({ email: value });

        if (userDoc) {
          throw new Error("Email address already exists");
        }
      }),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters"),
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 5 })
      .withMessage("Name must be at least 5 characters"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Validation failed, your entered data is invalid", errors: errors.array() });
    }
    next();
  },isAuth,
  userController.createUsers
);


router.get("/:userId",isAuth, userController.getUser);

router.put("/:userId", [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isString()
    .withMessage("Email must be a string")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 5 })
    .withMessage("Name must be at least 5 characters"),
],isAuth, userController.updateUser);

router.delete("/:userId",isAuth,userController.deleteUser);



  
module.exports = router;
