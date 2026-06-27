const express = require("express");
const router = express.Router();
const { submitContactForm, getContacts, deleteContact } = require("../controllers/contactController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", submitContactForm);
router.get("/", protect, admin, getContacts);
router.delete("/:id", protect, admin, deleteContact);

module.exports = router;
