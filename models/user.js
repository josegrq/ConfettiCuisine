const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");
const Course = require("./course");
const Subscriber = require("./subscriber");

const userSchema = mongoose.Schema(
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
    subscriberAccount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Subscriber,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Course,
      },
    ],
  },
  { timestamp: true }
);

userSchema.pre("save", (next) => {
  let user = this;
  if (user.subscriberAccount === undefined) {
    Subscriber.findOne({
      email: user.email,
    })
      .then(() => {
        user.subscriberAccount = subcriber;
        next();
      })
      .catch((error) => {
        console.log(`Error in associating subcriber: ${error}`);
        next(error);
      });
  }
  next();
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});
module.exports = mongoose.model("User", userSchema);
