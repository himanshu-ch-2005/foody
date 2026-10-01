const userModel = require("../models/user.models");
const foodPartnerModel = require("../models/foodpartner.models");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function createToken(id) {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );
}

// ==================== USER ====================

async function registerUser(req, res) {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Full name, email and password are required",
      });
    }

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.error("Register user error:", error);

    return res.status(500).json({
      message: "Failed to register user",
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = createToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    console.error("Login user error:", error);

    return res.status(500).json({
      message: "Failed to login",
    });
  }
}

function logoutUser(req, res) {
  res.clearCookie("token");

  return res.status(200).json({
    message: "User logged out successfully",
  });
}

// ==================== FOOD PARTNER ====================

async function registerFoodPartner(req, res) {
  try {
    const { restaurant, name, contact, address, email, password } = req.body;

    if (!restaurant || !name || !contact || !address || !email || !password) {
      return res.status(400).json({
        message:
          "Restaurant, name, contact, address, email and password are required",
      });
    }

    const isPartnerAlreadyExists = await foodPartnerModel.findOne({
      email,
    });

    if (isPartnerAlreadyExists) {
      return res.status(400).json({
        message: "Partner already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const partner = await foodPartnerModel.create({
      restaurant,
      name,
      contact,
      address,
      email,
      password: hashedPassword,
    });

    const token = createToken(partner._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "Partner registered successfully",

      partner: {
        _id: partner._id,
        restaurant: partner.restaurant,
        name: partner.name,
        contact: partner.contact,
        address: partner.address,
        email: partner.email,
      },
    });
  } catch (error) {
    console.error("Register partner error:", error);

    return res.status(500).json({
      message: "Failed to register partner",
    });
  }
}

async function loginFoodPartner(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const partner = await foodPartnerModel.findOne({
      email,
    });

    if (!partner) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, partner.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = createToken(partner._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Partner logged in successfully",

      partner: {
        _id: partner._id,
        restaurant: partner.restaurant,
        name: partner.name,
        contact: partner.contact,
        address: partner.address,
        email: partner.email,
      },
    });
  } catch (error) {
    console.error("Login partner error:", error);

    return res.status(500).json({
      message: "Failed to login",
    });
  }
}

function logoutFoodPartner(req, res) {
  res.clearCookie("token");

  return res.status(200).json({
    message: "Partner logged out successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
