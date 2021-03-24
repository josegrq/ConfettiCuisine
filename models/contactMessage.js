const mongoose = require("mongoose");
const contactMessageSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  message: String,
});

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
