var jwt = require("jsonwebtoken");
const JWT_SECRET = "iamawaishahid@gmail"; // secret key which will be saved into .env

const fetchuser = (req, res, next) => {
  // get user from jwt token and add it to req obj
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Error authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Error authenticate using a valid token" });
  }
};

module.exports = fetchuser;
