const mongoose = require("mongoose");
const subscriberSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  phone: String,
});

module.exports = mongoose.model("Subcriber", subscriberSchema);
