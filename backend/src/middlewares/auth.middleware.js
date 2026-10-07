const jwt = require("jsonwebtoken");

const foodPartnerModel = require("../models/foodpartner.models");
const userModel = require("../models/user.models");

function getToken(req) {
  return req.cookies?.token;
}

async function authFoodPartnerMiddleware(req, res, next) {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({
      message: "Please login as a food partner first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await foodPartnerModel.findById(decoded.id);

    if (!foodPartner) {
      return res.status(401).json({
        message: "Food partner not found",
      });
    }

    req.foodPartner = foodPartner;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

async function authUserMiddleware(req, res, next) {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({
      message: "Please login as a user first",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

// Used for the public Home feed.
// If a user is logged in, it also attaches req.user so the
// backend can return personalized like/save states.
async function optionalUserMiddleware(req, res, next) {
  const token = getToken(req);

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);

    if (user) {
      req.user = user;
    }
  } catch (error) {
    // Home feed is public, so an invalid/missing token
    // does not prevent the feed from loading.
  }

  return next();
}

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleware,
  optionalUserMiddleware,
};
