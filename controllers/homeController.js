var listOfCourses = [
    {
        title: "Tres Leches Cake",
        cost: 100,
        instructor: "Chef Ramirez",
        pic: "http://localhost:3000/images/tres-leches-cake.jpeg",
    },
    {
        title: "Flan",
        cost: 60,
        instructor: "Chef Quezada",
        pic: "http://localhost:3000/images/flan.jpeg",
    },
    {
        title: "Champurrado",
        cost: 40,
        instructor: "Chef Lopez",
        pic: "http://localhost:3000/images/champurrado.jpeg",
    },
    {
        title: "Chocoflan",
        cost: 70,
        instructor: "Chef Rodriguez",
        pic: "http://localhost:3000/images/choco-flan.jpeg",
    }
]
exports.showCourses = (request, response) => {
    response.render("courses", {offeredCourses: listOfCourses});
}

exports.showAbout = (request, response) => {
    response.render("about");
}

exports.showContact = (request, response) => {
    response.render("contact");
}
exports.showContactPosted = (request, response) => {
    response.render("thanks");
}

exports.showIndex = (request, response) => {
    response.render("index");
}
