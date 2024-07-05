const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
     
      return res.status(422).json({
        message: "Validation faild, your entered data is invalid",
        errors: errors.array(),
      });
      
    }

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      password: hashedPassword,
      name: name,
    });

    const result = user.save();

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

exports.login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });

    if (!user) {
      const error = new Error("a user with this email not found");
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error("wrong password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      "mohammadjavadasadi",
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 31536000000, // 1 year
    });

    res.status(200).json({ userId: user._id.toString() });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.logout = async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decodedToken = jwt.verify(token, "mohammadjavadasadi");
      // Invalidate the token by adding it to a blacklist or revoking it
      // For example, you can store the token in a database or a cache
      await invalidateToken(decodedToken);
    } catch (err) {
      console.error(err);
    }
  }
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};