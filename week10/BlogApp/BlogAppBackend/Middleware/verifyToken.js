import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const verifyToken = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      // read token from request cookies
      let token = req.cookies.token;
      console.log("token:", token);

      if (token === undefined) {
        return res.status(400).json({
          message: "Unauthorized request, please login"
        });
      }

      // verify and decode the token
      let decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // check if role is allowed
      if (!allowedRoles.includes(decodedToken.role)) {
        return res.status(403).json({
          message: "Forbidden. You don't have access"
        });
      }

      // attach user info to request
      req.user = decodedToken;

      // forward request to next middleware
      next();

    } catch (err) {

      // if token expired
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Session expired. Please login again"
        });
      }

      // if token invalid
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
          message: "Invalid token. Please login"
        });
      }

      next(err);
    }
  };
};