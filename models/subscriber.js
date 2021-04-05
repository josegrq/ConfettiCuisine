const mongoose = require("mongoose");
const Course = require("./course");
const subscriberSchema = mongoose.Schema(
  {
    name: {
      first_name: {
        type: String,
        required: true,
        trim: true,
      },
      last_name: {
        type: String,
        required: true,
        trim: true,
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      street: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      state: {
        type: String,
        required: true,
        trim: true,
      },
      zip: {
        type: Number,
        required: true,
        min: [10000, "ZIP code too short"],
        max: 99999,
      },
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Course,
      },
    ],
  },
  {
    timestamp: true,
  }
);

subscriberSchema.methods.getInfo = () => {
  return `Name: ${this.name.first_name} ${this.name.last_name} Email: ${this.email}`;
};

subscriberSchema.methods.fullName = () => {
  return `${this.name.first_name} ${this.name.last_name}`;
};
module.exports = mongoose.model("Subscriber", subscriberSchema);
