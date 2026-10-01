const foodModel = require("../models/food.models");
const likeModel = require("../models/likes.models");
const saveModel = require("../models/save.models");
const storageService = require("../services/storage.services");

const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Food video is required",
      });
    }

    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Food name is required",
      });
    }

    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      `${uuid()}-${req.file.originalname}`,
    );

    const foodItem = await foodModel.create({
      name: name.trim(),
      description: description?.trim() || "",
      video: fileUploadResult.url,
      foodPartner: req.foodPartner._id,
    });

    return res.status(201).json({
      message: "Food created successfully",
      food: foodItem,
    });
  } catch (error) {
    console.error("Create food error:", error);

    return res.status(500).json({
      message: "Failed to create food",
    });
  }
}

async function getFoodItems(req, res) {
  try {
    const foodItems = await foodModel
      .find({})
      .sort({
        createdAt: -1,
      })
      .lean();

    return res.status(200).json({
      message: "Food items fetched successfully",
      foodItems,
    });
  } catch (error) {
    console.error("Get food items error:", error);

    return res.status(500).json({
      message: "Failed to fetch food items",
    });
  }
}

async function likeFood(req, res) {
  try {
    const { foodId } = req.body;

    if (!foodId) {
      return res.status(400).json({
        message: "Food ID is required",
      });
    }

    const food = await foodModel.findById(foodId);

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    const existingLike = await likeModel.findOne({
      user: req.user._id,
      food: foodId,
    });

    if (existingLike) {
      await likeModel.deleteOne({
        _id: existingLike._id,
      });

      const updatedFood = await foodModel.findByIdAndUpdate(
        foodId,
        {
          $inc: {
            likeCount: -1,
          },
        },
        {
          new: true,
        },
      );

      return res.status(200).json({
        message: "Food unliked successfully",
        liked: false,
        likeCount: Math.max(0, updatedFood.likeCount),
      });
    }

    await likeModel.create({
      user: req.user._id,
      food: foodId,
    });

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        $inc: {
          likeCount: 1,
        },
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      message: "Food liked successfully",
      liked: true,
      likeCount: updatedFood.likeCount,
    });
  } catch (error) {
    console.error("Like food error:", error);

    return res.status(500).json({
      message: "Failed to update like",
    });
  }
}

async function saveFood(req, res) {
  try {
    const { foodId } = req.body;

    if (!foodId) {
      return res.status(400).json({
        message: "Food ID is required",
      });
    }

    const food = await foodModel.findById(foodId);

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    const existingSave = await saveModel.findOne({
      user: req.user._id,
      food: foodId,
    });

    if (existingSave) {
      await saveModel.deleteOne({
        _id: existingSave._id,
      });

      const updatedFood = await foodModel.findByIdAndUpdate(
        foodId,
        {
          $inc: {
            savesCount: -1,
          },
        },
        {
          new: true,
        },
      );

      return res.status(200).json({
        message: "Food unsaved successfully",
        saved: false,
        savesCount: Math.max(0, updatedFood.savesCount),
      });
    }

    await saveModel.create({
      user: req.user._id,
      food: foodId,
    });

    const updatedFood = await foodModel.findByIdAndUpdate(
      foodId,
      {
        $inc: {
          savesCount: 1,
        },
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      message: "Food saved successfully",
      saved: true,
      savesCount: updatedFood.savesCount,
    });
  } catch (error) {
    console.error("Save food error:", error);

    return res.status(500).json({
      message: "Failed to update saved food",
    });
  }
}

async function getSaveFood(req, res) {
  try {
    const savedFoods = await saveModel
      .find({
        user: req.user._id,
      })
      .populate("food")
      .sort({
        createdAt: -1,
      });

    return res.status(200).json({
      message: "Saved foods retrieved successfully",
      savedFoods,
    });
  } catch (error) {
    console.error("Get saved foods error:", error);

    return res.status(500).json({
      message: "Failed to fetch saved foods",
    });
  }
}

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  getSaveFood,
};
