const express = require("express");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const expressSession = require("express-session");
const flash = require("connect-flash");
const User = require("./models/user");

mongoose.connect(
  //Conenct to DB defined in MONGODB_URI or deafult to localhost
  process.env.MONGODB_URI || "mongodb://localhost:27017/ConfettiCuisine",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  }
);

const app = express();
const router = require("./routes/index");
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(layouts);

/*app.get("/", homeController.showIndex);*/

//MIDDLEWARE
//PRE-PROCESSING REQUESTS
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: false,
  })
);
//Interpret body and query string data as JSON
app.use(express.json());
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.use(expressValidator());

//Use sessions
app.use(cookieParser("secure_passcode"));
app.use(
  expressSession({
    secret: "secure_passcode",
    cookie: {
      maxAge: 360000,
    },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());

//Use Passport and use same session strategy for msgs
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((request, response, next) => {
  response.locals.flashMessages = request.flash();
  response.locals.loggedIn = request.isAuthenticated();
  response.locals.currentUser = request.user;
  next();
});

//ROUTES GO HERE

//Let app know to use router to manage our routes
app.use("/", router);
app.listen(app.get("port"), () => {
  console.log(`Server is running on port: ${app.get("port")}`);
});
