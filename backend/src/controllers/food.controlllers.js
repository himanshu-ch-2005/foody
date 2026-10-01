const foodModel = require('../models/food.models');
const storageService = require('../services/storage.services')
const {v4: uuid} = require('uuid')

async function createFood(req, res) {
    // for unique id install uuid generator
    const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })

    res.status(201).json({
        message: "Food created successfully",
        food:foodItem
    })

}
 
async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({});

    res.status(200).json({
        message: "Food items fetched successfully",
        foodItems
    })
}


module.exports = {
    createFood,
    getFoodItems
}