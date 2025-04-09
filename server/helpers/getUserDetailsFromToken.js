const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const getUserDetailsFromToken = async (token) => {
  if (!token) {
    return {
      message: "session out",
      logout: true,
    };
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECREAT_KEY);
    const user = await UserModel.findById(decode.id);
    return user;
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.error("Token has expired.");
      return {
        message: "session expired",
        logout: true,
      };
    } else {
      console.error("Token verification failed:", err.message);
      return {
        message: "invalid token",
        logout: true,
      };
    }
  }
};

module.exports = getUserDetailsFromToken;
