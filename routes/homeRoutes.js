const router = require("express").Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.showIndex);
router.get("/about", homeController.showAbout);

module.exports = router;
