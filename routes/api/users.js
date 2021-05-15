const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");
const passwordValidator = require("password-validator");
const User = require("../../models/User");

// route:  POST api/users
// desc:   Register user
// access: Public

router.post(
  "/",
  [check("email", "Please enter valid email").isEmail()],
  async (req, res) => {
    const schema = new passwordValidator();
    schema.is().min(6).has().digits(1);

    let errors = validationResult(req);
    const passwordErrors = schema.validate(req.body.password, { list: true });
    if (passwordErrors.length !== 0) {
      let message;
      if (passwordErrors.length > 1) {
        message =
          "Password must be at least 6 characters long and contain digits and letters";
      } else {
        switch (passwordErrors[0]) {
          case "min":
            message = "Password must be at least 6 cahracters long";
            break;
          case "digits":
            message = "Password must contain at least one digit";
            break;
        }
      }
      errors.errors.push({
        value: req.body.password,
        msg: message,
        param: "password",
        location: "body",
      });
    }
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { password } = req.body;
    const email = req.body.email.toLowerCase();
    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Email already registred" }] });
      }

      user = new User({ email, password });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
