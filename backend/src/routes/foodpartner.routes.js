const express = require("express");

const foodPartnerController = require("../controllers/foodpartner.controllers");

const router = express.Router();

// Store pages are public.
router.get("/:id", foodPartnerController.getFoodPartnerById);

module.exports = router;
