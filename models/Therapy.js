const mongoose = require("mongoose");

const TherapySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  period: {
    type: Number,
    required: true,
  },
  frequency: {
    type: String,
    required: true,
  },
  time: {
    type: [String],
  },
  perDays: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Therapy = mongoose.model("therapy", TherapySchema);
