const httpErrorStatusCodes = require('http-status-codes');

exports.pageNotFoundError = (request, response) => {
    let errorCode = httpErrorStatusCodes.NOT_FOUND;
    response.status(errorCode);
    response.render('error');
}

exports.internalServerError = (error, request, response, next) => {
    response.status(httpErrorStatusCodes.INTERNAL_SERVER_ERROR);
    response.send("We are experiencing some trouble with our servers. Sorry for the inconvenience.");
    console.log(error.stack);
    next();
}