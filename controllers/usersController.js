const { request } = require("express");
const User = require("../models/user");
const passport = require("passport");

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
  login: (request, response) => {
    response.render("users/login");
  },
  authenticate: passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: "Login failed. Double check your inputs.",
    successRedirect: "/",
    successFlash: "Successfully logged in!",
  }),
  logout: (request, response, next) => {
    request.logout();
    request.flash("success", "You have been logged out.");
    response.locals.redirect = "/";
    next();
  },
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
  new: (request, response) => {
    response.render("users/new");
  },
  validate: (request, response, next) => {
    //Validate input from user
    request
      .sanitizeBody("email")
      .normalizeEmail({
        all_lowercase: true,
      })
      .trim();

    request.check("email", "Email is not valid").isEmail();
    request.check("zip", "ZIP code is not valid").notEmpty().isInt().isLength({
      min: 5,
      max: 5,
    });
    request.check("password", "Password cannot be empty").notEmpty();
    request.getValidationResult().then((error) => {
      if (!error.isEmpty()) {
        let messages = error.array().map((e) => e.message);
        request.flash("error", messages.join(" and "));
        request.skip = true;
        response.locals.redirect = "/users/new";
        next();
      } else {
        next();
      }
    });
  },
  create: (request, response, next) => {
    if (request.skip) {
      return next();
    }
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
    User.register(newUser, request.body.password, (error, user) => {
      if (user) {
        request.flash("success", "Successfully created new account!");
        response.locals.redirect = "/users";
        next();
      } else {
        request.flash(
          "error",
          `New user account failed to create: ${error.message}`
        );
        response.locals.redirect = "/users/new";
        next();
      }
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
    User.findByIdAndUpdate(userId, userParams)
      .then((user) => {
        response.locals.redirect = `/users/${userId}`;
        request.flash("success", "Successfully updated your account!");
        response.locals.user = user;
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
