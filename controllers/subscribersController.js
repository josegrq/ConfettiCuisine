const Subscriber = require("../models/subcriber");

exports.getSubscribers = (request, response) => {
  Subscriber.find({})
    .exec()
    .then((subs) => response.render("subscribers", { subscribers: subs }))
    .catch((error) => {
      console.log(error);
      return [];
    })
    .then(() => console.log("Promise Complete!"));
};

exports.getSubscriptionPage = (request, response) => response.render("signUp");

exports.saveSubscriber = (request, response) => {
  let newSubcriber = new Subscriber({
    first_name: request.body.first_name,
    last_name: request.body.last_name,
    email: request.body.email,
    address: {
      street: request.body.street,
      city: request.body.city,
      state: request.body.state,
      zip: request.body.zip,
    },
    phone: request.body.phone,
  });
  newSubcriber
    .save()
    .then(() => response.render("thanks", { msg: "Welcome to the family!" }))
    .catch((error) => response.send(error));
};
