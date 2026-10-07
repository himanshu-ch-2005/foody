const express = require("express");
const multer = require("multer");

const foodController = require("../controllers/food.controlllers");

const {
  authFoodPartnerMiddleware,
  authUserMiddleware,
  optionalUserMiddleware,
} = require("../middlewares/auth.middleware");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

// Food partner
router.post(
  "/",
  authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood,
);

// Home feed
// Public so both users and food partners can see it.
router.get("/", optionalUserMiddleware, foodController.getFoodItems);

// User-only actions
router.post("/like", authUserMiddleware, foodController.likeFood);

router.post("/save", authUserMiddleware, foodController.saveFood);

router.get("/save", authUserMiddleware, foodController.getSaveFood);

module.exports = router;
