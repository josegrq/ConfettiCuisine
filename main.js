const express = require('express');
const homeController = require('./controllers/homeController');
const errorController = require('./controllers/errorController');
const layouts = require('express-ejs-layouts');

const app = express();

app.set("port", process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.use(layouts);

app.get("/", homeController.showIndex);

//MIDDLEWARE
//PRE-PROCESSING REQUESTS
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: false
}));
//Interpret body and query string data as JSON
app.use(express.json());

//ROUTES GO HERE
app.get('/courses', homeController.showCourses);
app.get('/signUp', homeController.showSignUp); //Load sign up page
app.post('/signUp', homeController.showSignUpPosted); //After form is submitted, we need to show msg to user
app.get('/about', homeController.showAbout);
app.get('/contact', homeController.showContact);
app.post('/contact', homeController.showContactPosted);

//PAGE ERROR HANDLING
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);


app.listen(app.get("port"), () => {
    console.log(`Server is running on port: ${app.get("port")}`);
});