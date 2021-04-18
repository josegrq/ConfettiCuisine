const router = require("express").Router();
const contactsController = require("../controllers/contactsController");

router.get("/", contactsController.getContactPage);

module.exports = router;
