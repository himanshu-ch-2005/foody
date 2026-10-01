const userModel = require("../models/user.models");
const foodPartnerModel = require("../models/foodpartner.models")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // cookie parser will be in app.js
require("dotenv").config();

// user controllers
async function registerUser(req, res) {
  const { fullName, email, password } = req.body;
  // it can not read data directly from body we've to use app.use(express.json) in app.js file

  const isUserAlreadyExists = await userModel.findOne({
    email,
  });
  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User Already Exists",
    });
  }
  // npm i bcrypt for hashing
  const hashedPassword = await bcrypt.hash(password, 10); // 10 for round

  const user = await userModel.create({
    fullName,
    email,
    password: hashedPassword,
  });
  // now we need tokens so install npm i jsonwebtoken and cookie-parser
  const token = jwt.sign(
    {
      id: user._id, // now generate a secret key from any website
    },
    process.env.JWT_SECRET,
  ); // 128 bits

  res.cookie("token", token); // save token as token

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email
  });

  if (!user) {
    res.status(400).json({
      message: "Invalid email or password"
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );
  
  res.cookie("token", token);
  res.status(200).json({
    message: "User loggedin Successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName
    }
  })

}

function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User loggedout successfully"
  })
}

// foodPartner controllers
async function registerFoodPartner(req, res){
  const { restaurant,name, contact, address, email, password } = req.body;

  const isPartnerAlreadyExists = await foodPartnerModel.findOne({
    email
  })

  if (isPartnerAlreadyExists) {
    return res.status(400).json({
      message: "Partner already exists"
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const partner = await foodPartnerModel.create({
    restaurant,
    name,
    contact,
    address,
    email,
    password:hashedPassword
  })

  const token = jwt.sign({
    id:partner._id
  }, process.env.JWT_SECRET)

  res.cookie("token", token);
  res.status(201).json({
    message: "Partner registered successfully",
    partner: {
      _id: partner._id,
      email: partner.email,
      name: partner.name,
      restaurant: partner.restaurant,
      contact: partner.contact,
      address: partner.address
    },
  });

}

async function loginFoodPartner(req, res) {
  const { email, password } = req.body;
  const partner = await foodPartnerModel.findOne({
    email
  })
  if (!partner) {
    return res.status(400).json({
      message:"Invalid Email or Password"
    })
  }
  const isPasswordValid = await bcrypt.compare(password, partner.password);
  if (!isPasswordValid) {
    res.status(400).json({
      message: "Invalid Email or Password"
    })
  }
  const token = jwt.sign({
    id: partner._id
  }, process.env.JWT_SECRET);

  res.cookie("token", token);
  res.status(200).json({
    message: "Partner logged in successfully",
    partner: {
      _id: partner._id,
      email: partner.email,
      name: partner.name
    }
  })
}

function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged successfully"
  })
}



module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner
};
