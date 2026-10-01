const express = require("express");

const foodPartnerController = require("../controllers/foodpartner.controllers");

const { authUserMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get(
  "/:id",
  authUserMiddleware,
  foodPartnerController.getFoodPartnerById,
);

module.exports = router;
