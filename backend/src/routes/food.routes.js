const express = require("express");
const multer = require("multer");

const foodController = require("../controllers/food.controlllers");
const {
  authFoodPartnerMiddleware,
  authUserMiddleware,
} = require("../middlewares/auth.middleware");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

// ==================== FOOD PARTNER ====================

// Create food
router.post(
  "/",
  authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood,
);

// ==================== USER ====================

// Get home feed
router.get("/", authUserMiddleware, foodController.getFoodItems);

// Like / Unlike
router.post("/like", authUserMiddleware, foodController.likeFood);

// Save / Unsave
router.post("/save", authUserMiddleware, foodController.saveFood);

// Get saved foods
router.get("/save", authUserMiddleware, foodController.getSaveFood);

module.exports = router;
