const ContactMessage = require("../models/contactMessage");

//All contact messages are only meant to be seen in the back end by the team

exports.getContactPage = (request, response) => response.render("contact");

exports.saveContactMessage = (request, response) => {
  let newContactMessage = new ContactMessage({
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
    phone: request.body.phone,
    message: request.body.message,
  });
  newContactMessage
    .save()
    .then(() =>
      response.render("thanks", { msg: "Someone will reach out shortly." })
    )
    .catch((error) => response.send(error));
};
