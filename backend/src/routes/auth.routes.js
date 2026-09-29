const express = require("express");
const authController = require("../controllers/auth.controllers");

const router = express.Router();
// user api
router.post("/user/register", authController.registerUser); // logic is in controller
// now call it in app.js
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);

// foodpartner api
router.post("/partner/register", authController.registerFoodPartner);
router.post("/partner/login", authController.loginFoodPartner);
router.get("/partner/logout", authController.logoutFoodPartner);

module.exports = router;
