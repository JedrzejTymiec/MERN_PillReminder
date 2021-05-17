const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Therapy = require("../../models/Therapy.js");

// route:  GET api/therapy/user/
// desc:   Get therapies of currently logged user
// access: Private

router.get("/user/", auth, async (req, res) => {
  try {
    const therapies = await Therapy.find({ user: req.user.id });

    if (!therapies) {
      return res.json({ msg: "No therapies found" });
    } else {
      return res.json(therapies);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// route:  POST api/therapy/
// desc:   Create new therapy
// access: Private

router.post(
  "/",
  [
    auth,
    [
      check("name", "Name of therapy is required").not().isEmpty(),
      check("unit", "Unit is required").not().isEmpty(),
      check("period", "Period is required, please enter number")
        .not()
        .isEmpty()
        .isInt(),
      check("frequency", "Please choose frequency").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { name, unit, period, frequency, time, perDays } = req.body;

    const therapyData = {};
    therapyData.user = req.user.id;
    if (name) therapyData.name = name;
    if (unit) therapyData.unit = unit;
    if (period) therapyData.period = period;
    if (frequency) therapyData.frequency = frequency;
    if (time) therapyData.time = time;
    if (perDays) therapyData.perDays = perDays;

    try {
      const therapy = new Therapy(therapyData);
      await therapy.save();
      res.json(therapy);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// route:  GET api/therapy/:therapy_id
// desc:   Get therapy by id
// access: Private

router.get("/:therapy_id", auth, async (req, res) => {
  try {
    const therapy = await Therapy.findById(req.params.therapy_id);

    if (therapy.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    res.json(therapy);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// route:  PUT api/therapy/:therapy_id
// desc:   Update therapy by id
// access: Private

router.put(
  "/:therapy_id",
  [
    auth,
    [
      check("name", "Name of therapy is required").not().isEmpty(),
      check("unit", "Unit is required").not().isEmpty(),
      check("period", "Period is required, please enter number")
        .not()
        .isEmpty()
        .isInt(),
      check("frequency", "Please choose frequency").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    try {
      let therapy = await Therapy.findById(req.params.therapy_id);
      if (therapy.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }
      const { name, unit, period, frequency, time, perDays } = req.body;

      const therapyData = {};
      therapyData.user = req.user.id;
      if (name) therapyData.name = name;
      if (unit) therapyData.unit = unit;
      if (period) therapyData.period = period;
      if (frequency) therapyData.frequency = frequency;
      if (time) therapyData.time = time;
      if (perDays) therapyData.perDays = perDays;

      therapy = await Therapy.findByIdAndUpdate(
        req.params.therapy_id,
        { $set: therapyData },
        { new: true }
      );
      res.json(therapy);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// route:  DELETE api/therapy/:therapy_id
// desc:   Delete therapy by id
// access: Private

router.delete("/:therapy_id", auth, async (req, res) => {
  try {
    await Therapy.findByIdAndDelete(req.params.therapy_id);
    res.json({ msg: "Therapy deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
