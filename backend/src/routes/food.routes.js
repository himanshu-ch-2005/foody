const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const foodController = require('../controllers/food.controlllers')
const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage:multer.memoryStorage(),
})




// POST /api/food/ [protected] because every user can not add food item so we'll create a middleware
router.post('/', authMiddleware.authFoodPartnerMiddleware,
    upload.single("video"),
    foodController.createFood);

module.exports = router;