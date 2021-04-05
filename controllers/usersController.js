const { request } = require("express");
const User = require("../models/user");

const getParams = (body) => {
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
    password: body.password,
  };
};
module.exports = {
  index: (request, response, next) => {
    User.find()
      .then((users) => {
        response.locals.users = users;
        next();
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
  indexView: (request, response) => {
    response.render("users/index");
  },
  new: (rquest, response) => {
    response.render("users/new");
  },
  create: (request, response, next) => {
    let newUser = new User({
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
      password: request.body.password,
    });
    User.create(newUser)
      .then((user) => {
        response.locals.user = user;
        response.locals.redirect = "/users";
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
    let userId = request.params.id;
    User.findById(userId)
      .then((user) => {
        response.locals.user = user;
        next();
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
  showView: (request, response) => {
    response.render("users/show");
  },
  edit: (request, response, next) => {
    let userId = request.params.id;
    User.findById(userId)
      .then((user) => {
        response.render("users/edit", { user: user });
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
  update: (request, response, next) => {
    let userId = request.params.id;
    let userParams = getParams(request.body);
    /*let updatedUser = new User({
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
      password: request.body.password,
    });*/
    User.findByIdAndUpdate(userId, userParams)
      .then((user) => {
        response.locals.redirect = `/users/${userId}`;
        response.locals.user = user;
        console.log("Jose 0");
        next();
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
  delete: (request, response, next) => {
    let userId = request.params.id;
    User.findByIdAndDelete(userId)
      .then((user) => {
        //You can do something woth the deleted subs info if you want
        response.locals.redirect = "/users";
        next();
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
};
