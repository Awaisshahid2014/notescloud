const express = require("express");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const User = require("../models/User");
const { body, validationResult } = require("express-validator"); // it is a library for validation
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "iamawaishahid@gmail"; // secret key which will be saved into .env

const router = express.Router();
// ROUTE 1: create a user using: post "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "Password must be 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // if there are errors, return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      // check whether the user with this exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: "Email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // creation() saves data into DB
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: { id: user.id },
      };
      console.log(user.id, data);
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      // res.json(user);
      res.json({ success, authToken, user, status: true });
    } catch (error) {
      res.status(500).send("some error occured");
    }
  }
);

// ROUTER 2: authentical a user using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [
    body("email", "Enter valid email").isEmail(),
    body("password", "Password must not be empty").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please enter correct email and password" });
      }
      const comparePassword = bcrypt.compare(password, user.password);
      if (!comparePassword) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please login with correct credentials" });
      }
      const data = { user: { id: user.id } };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.send({ success, authToken });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE 3: Get loggedin users details using: POST 'api/auth/getuser'. login required
router.post("/getusers", fetchuser, async (req, res) => {
  try {
    // console.log(req.user, "in the middleware");
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
