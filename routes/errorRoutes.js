const router = require("express").Router();
const errorController = require("../controllers/errorController");

//PAGE ERROR HANDLING
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

module.exports = router;
