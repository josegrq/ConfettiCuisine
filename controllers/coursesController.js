const { request } = require("express");
const Course = require("../models/course");
const User = require("../models/user");
const httpStatus = require("http-status-codes");

const getParams = (body) => {
  return {
    title: body.title,
    description: body.description,
    instructor: body.instructor,
    maxStudents: parseInt(body.maxStudents),
    cost: parseInt(body.cost),
  };
};

module.exports = {
  index: (request, response, next) => {
    Course.find()
      .then((courses) => {
        response.locals.courses = courses;
        next();
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
  indexView: (request, response) => {
    response.render("courses/index");
  },
  new: (rquest, response) => {
    response.render("courses/new");
  },
  create: (request, response, next) => {
    let newCourse = new Course({
      title: request.body.title,
      description: request.body.description,
      instructor: request.body.instructor,
      maxStudents: request.body.maxStudents,
      cost: request.body.cost,
    });
    Course.create(newCourse)
      .then((course) => {
        response.locals.course = course;
        response.locals.redirect = "/courses";
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
    let courseId = request.params.id;
    Course.findById(courseId)
      .then((course) => {
        response.locals.course = course;
        next();
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
  showView: (request, response) => {
    response.render("courses/show");
  },
  edit: (request, response, next) => {
    let courseId = request.params.id;
    Course.findById(courseId)
      .then((course) => {
        response.render("courses/edit", { course: course });
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
  update: (request, response, next) => {
    let courseId = request.params.id;
    let courseParams = getParams(request.body);
    Course.findByIdAndUpdate(courseId, courseParams)
      .then((course) => {
        response.locals.course = course;
        response.locals.redirect = `/courses/${courseId}`;
        next();
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
  delete: (request, response, next) => {
    let courseId = request.params.id;
    Course.findByIdAndDelete(courseId)
      .then((course) => {
        response.locals.redirect = "/courses";
        next();
      })
      .catch((error) => {
        console.log(error);
        next(error);
      });
  },
  respondJSON: (request, response) => {
    response.json({
      status: httpStatus.OK,
      data: response.locals,
    });
  },
  errorJSON: (error, request, response, next) => {
    let errorObject;
    if (error) {
      errorObject = {
        status: httpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    } else {
      errorObject = {
        status: httpStatus.OK,
        message: "Unknown Error",
      };
    }
    response.json(errorObject);
  },
  filterUserCourses: (request, response, next) => {
    let currentUser = response.locals.currentUser;
    if (currentUser) {
      let courses = response.locals.courses.map((course) => {
        let userJoined = currentUser.courses.some((userCourse) => {
          return userCourse.equals(course._id);
        });
        return Object.assign(course.toObject(), { joined: userJoined });
      });
      response.locals.courses = courses;
      next();
    } else {
      next();
    }
  },
  join: (request, response, next) => {
    let courseId = request.params.id;
    let currentUser = request.user;

    if (currentUser) {
      User.findByIdAndUpdate(currentUser, {
        $addToSet: {
          courses: courseId,
        },
      })
        .then(() => {
          response.locals.success = true;
          next();
        })
        .catch((error) => {
          next(error);
        });
    } else {
      next(new Error("User must log in."));
    }
  },
};
