const courses = require('../staticData/courses');

exports.showCourses = (request, response) => {
    response.render("courses", {offeredCourses: courses});
}

exports.showSignUp = (request, response) => {
    response.render("signUp");
}

exports.showSignUpPosted = (request, response) => {
    response.render("thanks");
}

exports.showAbout = (request, response) => {
    response.render("about");
}

exports.showContact = (request, response) => {
    response.render("contact");
}
exports.showContactPosted = (request, response) => {
    response.render("Someone will rach out to you soon!");
}

exports.showIndex = (request, response) => {
    response.render("index");
}
