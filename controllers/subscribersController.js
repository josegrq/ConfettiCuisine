const { request } = require("express");
const Subscriber = require("../models/subscriber");

const getSubscriberParams = (body) => {
  return {
    name: {
      first_name: body.first_name,
      last_name: body.last_name,
    },
    email: body.email,
    address: {
      street: body.street,
      city: body.city,
      state: body.state,
      zip: parseInt(body.zip),
    },
    phone: body.phone,
  };
};
module.exports = {
  index: (request, response, next) => {
    Subscriber.find()
      .then((subscribers) => {
        response.locals.subscribers = subscribers;
        next();
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
  indexView: (request, response) => {
    response.render("subscribers/index");
  },
  new: (request, response) => {
    response.render("subscribers/new");
  },
  create: (request, response, next) => {
    let newSubscriber = new Subscriber({
      name: {
        first_name: request.body.first_name,
        last_name: request.body.last_name,
      },
      email: request.body.email,
      address: {
        street: request.body.street,
        city: request.body.city,
        state: request.body.state,
        zip: request.body.zip,
      },
      phone: request.body.phone,
    });
    Subscriber.create(newSubscriber)
      .then((subscriber) => {
        response.locals.subscriber = subscriber;
        response.locals.redirect = "/subscribers";
        next();
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
  redirectView: (request, response, next) => {
    let path = response.locals.redirect;
    if (path) {
      response.redirect(path);
    }
    next();
  },
  show: (request, response, next) => {
    var subscriberId = request.params.id;
    Subscriber.findById(subscriberId)
      .then((subscriber) => {
        response.locals.subscriber = subscriber;
        next();
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
  showView: (request, response) => {
    response.render("subscribers/show");
  },
  edit: (request, response, next) => {
    let subscriberId = request.params.id;
    Subscriber.findById(subscriberId)
      .then((subscriber) => {
        response.render("subscribers/edit", { subscriber: subscriber });
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
  update: (request, response, next) => {
    let subscriberId = request.params.id;
    let subscriberParams = getSubscriberParams(request.body);
    Subscriber.findByIdAndUpdate(subscriberId, subscriberParams)
      .then((subscriber) => {
        response.locals.redirect = `/subscribers/${subscriberId}`;
        response.locals.subscriber = subscriber;
        next();
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
  delete: (request, response, next) => {
    let subscriberId = request.params.id;
    Subscriber.findByIdAndDelete(subscriberId)
      .then((subscriber) => {
        response.locals.redirect = "/subscribers";
        next();
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
};
