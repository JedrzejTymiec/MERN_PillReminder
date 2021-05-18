const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const config = require("config");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

// route:  POST api/auth
// desc:   Login user
// access: Public

router.post(
  "/",
  [
    check("email", "Please enter valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;
    const email = req.body.email.toLowerCase();

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid email or password" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid email or password" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get("jwtSecret"), (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

// route:  POST api/auth
// desc:   Login user
// access: Public

router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
