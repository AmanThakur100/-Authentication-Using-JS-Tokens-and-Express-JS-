import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const checkUserAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      // Get Token from Header
      const token = authorization.split(" ")[1];

      // Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Get User from Token
      req.user = await UserModel.findById(decoded.userID).select("-password");

      // Proceed to the next middleware
      next();
    } catch (error) {
      console.error("Authentication error:", error.message);
      return res
        .status(401)
        .send({ status: "failed", message: "Unauthorized User" });
    }
  } else {
    return res
      .status(401)
      .send({ status: "failed", message: "Unauthorized User, No Token" });
  }
};

export default checkUserAuth;
