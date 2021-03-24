const express = require("express");
const homeController = require("./controllers/homeController");
const errorController = require("./controllers/errorController");
const subscribersController = require("./controllers/subscribersController");
const messageController = require("./controllers/messagesController");
const layouts = require("express-ejs-layouts");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ConfettiCuisine", {
  useNewUrlParser: true,
});

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(layouts);

app.get("/", homeController.showIndex);

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

//ROUTES GO HERE
app.get("/courses", homeController.showCourses);
app.get("/about", homeController.showAbout);
app.get("/contact", messageController.getContactPage);
app.post("/contact", messageController.saveContactMessage);

app.get("/signUp", subscribersController.getSubscriptionPage);
app.post("/signUp", subscribersController.saveSubscriber);

app.get("/subscribers", subscribersController.getSubscribers);

//PAGE ERROR HANDLING
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

app.listen(app.get("port"), () => {
  console.log(`Server is running on port: ${app.get("port")}`);
});
