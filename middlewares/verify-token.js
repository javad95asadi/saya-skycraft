const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "mohammadjavadasadi");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Invalid token" });
  }

  if (!decodedToken) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.userId = decodedToken.userId;
  next();
};