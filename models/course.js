const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    instructor: {
      type: String,
      required: true,
      trim: true,
    },
    maxStudents: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Course cannot have a negative number of students"],
    },
    cost: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Cost cannot be negaftive"],
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);
