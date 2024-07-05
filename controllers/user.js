const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const sanitize = require('sanitize-html');
exports.getUsers = async (req, res, next) => {
  try {
    const {
      page = 1, 
      pageSize = 10, 
      sortBy = 'createdAt', 
    } = req.query;

    const query = User.find();
    query.sort({ [sortBy]: -1 }); 
    const totalItems = await User.countDocuments();
    const skip = (page - 1) * pageSize;
    query.skip(skip).limit(pageSize);
    const users = await query.exec();

    res.status(200).json({
      message: "Fetched users successfully.",
      users: users,
      totalItems: totalItems,
      currentPage: page,
      itemsPerPage: pageSize,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.createUsers = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Validation failed, your entered data is invalid",
        errors: errors.array(),
      });
    }

    const email = sanitize(req.body.email);
    const name = sanitize(req.body.name);
    const password = sanitize(req.body.password);

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res.status(422).json({
        message: "Invalid email address",
      });
    }


    const hashedPassword = await bcrypt.hash(password, 12);


    const user = new User({
      email: email,
      password: hashedPassword,
      name: name,
    });

    const result = await user.save();

    return res
      .status(201)
      .json({ message: "User saved successfully", userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.getUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Validation failed, your entered data is invalid",
        errors: errors.array(),
      });
    }

    const userId = req.params.userId.replace(/^:/, ''); 
    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("Could not find user.");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "User fetched.", users: user });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Validation failed, your entered data is invalid",
        errors: errors.array(),
      });
    }
    const userId = req.params.userId.replace(/^:/, '');
    const user = await User.findById(userId);
    const email = sanitize(req.body.email);
    const name = sanitize(req.body.name);
    const password = sanitize(req.body.password);

    if (!user) {
      const error = new Error("Could not find user.");
      error.statusCode = 404;
      throw error;
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res.status(422).json({
        message: "Invalid email address",
      });
    }




    const hashedPassword = await bcrypt.hash(password, 12);

    user.email = email;
    user.name = name;
    user.password = hashedPassword;

    await user.save();
    res.status(200).json({
      message: "user Updated Successfully",
      users: user,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Validation failed, your entered data is invalid",
        errors: errors.array(),
      });
    }
    const userId = req.params.userId.replace(/^:/, ''); 
    const user = await User.findById(userId);

    if (!user) {
      const error = new Error("Could not find user.");
      error.statusCode = 404;
      throw error;
    }
    await user.remove();
    return res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
