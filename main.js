const express = require("express");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");
const contactsController = require("./controllers/contactsController");
const usersController = require("./controllers/usersController");
const coursesController = require("./controllers/coursesController");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const expressSession = require("express-session");
const flash = require("connect-flash");
const User = require("./models/user");
const { request } = require("express");

mongoose.connect("mongodb://localhost:27017/ConfettiCuisine", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const app = express();
const router = express.Router();
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
router.use(layouts);

/*app.get("/", homeController.showIndex);*/

//MIDDLEWARE
//PRE-PROCESSING REQUESTS
router.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: false,
  })
);
//Interpret body and query string data as JSON
router.use(express.json());
router.use(methodOverride("_method", { methods: ["POST", "GET"] }));
router.use(expressValidator());

//Use sessions
router.use(cookieParser("secure_passcode"));
router.use(
  expressSession({
    secret: "secure_passcode",
    cookie: {
      maxAge: 360000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
router.use(flash());

//Use Passport and use same session strategy for msgs
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use((request, response, next) => {
  response.locals.flashMessages = request.flash();
  response.locals.loggedIn = request.isAuthenticated();
  response.locals.currentUser = request.user;
  next();
});

//ROUTES GO HERE
/*app.get("/courses", homeController.showCourses);
app.get("/about", homeController.showAbout);
app.get("/contact", messageController.getContactPage);
app.post("/contact", messageController.saveContactMessage);

app.get("/signUp", subscribersController.getSubscriptionPage);
app.post("/signUp", subscribersController.saveSubscriber);

app.get("/subscribers", subscribersController.getSubscribers);*/

router.get("/", homeController.showIndex);
router.get("/about", homeController.showAbout);
//router.get("/courses", homeController.showCourses);
router.get("/contact", contactsController.getContactPage);

//SUBSCRIBERS
router.get(
  "/subscribers",
  subscribersController.index,
  subscribersController.indexView
);
router.get("/subscribers/new", subscribersController.new);
router.post(
  "/subscribers/create",
  subscribersController.create,
  subscribersController.redirectView
);
router.get(
  "/subscribers/:id",
  subscribersController.show,
  subscribersController.showView
);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put(
  "/subscribers/:id/update",
  subscribersController.update,
  subscribersController.redirectView
);
router.delete(
  "/subscribers/:id/delete",
  subscribersController.delete,
  subscribersController.redirectView
);

//USERS
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post(
  "/users/create",
  usersController.validate,
  usersController.create,
  usersController.redirectView
);
router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate);
router.get(
  "/users/logout",
  usersController.logout,
  usersController.redirectView
);

router.get("/users/:id/edit", usersController.edit);
router.put(
  "/users/:id/update",
  usersController.validate,
  usersController.update,
  usersController.redirectView
);
router.get("/users/:id", usersController.show, usersController.showView);
router.delete(
  "/users/:id/delete",
  usersController.delete,
  usersController.redirectView
);

//COURSES
router.get("/courses", coursesController.index, coursesController.indexView);
router.get("/courses/new", coursesController.new);
router.post(
  "/courses/create",
  coursesController.create,
  coursesController.redirectView
);
router.get("/courses/:id", coursesController.show, coursesController.showView);
router.get("/courses/:id/edit", coursesController.edit);
router.put(
  "/courses/:id/update",
  coursesController.update,
  coursesController.redirectView
);
router.delete(
  "/courses/:id/delete",
  coursesController.delete,
  coursesController.redirectView
);

//PAGE ERROR HANDLING
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

//Let app know to use router to manage our routes
app.use("/", router);
app.listen(app.get("port"), () => {
  console.log(`Server is running on port: ${app.get("port")}`);
});
