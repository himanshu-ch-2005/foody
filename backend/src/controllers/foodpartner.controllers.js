const mongoose = require("mongoose");

const foodPartnerModel = require("../models/foodpartner.models");
const foodModel = require("../models/food.models");

async function getFoodPartnerById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid food partner ID",
      });
    }

    const foodPartner = await foodPartnerModel
      .findById(id)
      .select("-password")
      .lean();

    if (!foodPartner) {
      return res.status(404).json({
        message: "Food partner not found",
      });
    }

    const foodItems = await foodModel
      .find({
        foodPartner: id,
      })
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      message: "Food partner retrieved successfully",

      foodPartner: {
        ...foodPartner,
        foodItems,
      },
    });
  } catch (error) {
    console.error("Get food partner error:", error);

    return res.status(500).json({
      message: "Failed to fetch food partner",
    });
  }
}

module.exports = {
  getFoodPartnerById,
};
