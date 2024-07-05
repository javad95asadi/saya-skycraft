const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const usersRoutes = require("./routes/user");
const authRoutes=require('./routes/auth');
const multer = require("multer");

const app = express();
mongoose.set('strictQuery', false);
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/users", usersRoutes);
app.use('/auth',authRoutes);

app.use((error, req, res, next) => {
  
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/saya_skycraft")
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
