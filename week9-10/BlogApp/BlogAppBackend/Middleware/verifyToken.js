import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const verifyToken = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      // read token from cookies
      const token = req.cookies.token;

      // token not present
      if (!token) {
        return res.status(401).json({
          message: "Unauthorized. Please login"
        });
      }

      // verify and decode token
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // check role access
      if (!allowedRoles.includes(decodedToken.role)) {
        return res.status(403).json({
          message: "Forbidden. You don't have permission"
        });
      }

      // attach user to request
      req.user = decodedToken;

      next();

    } catch (err) {

      // token expired
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Session expired. Please login again"
        });
      }

      // invalid token
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
          message: "Invalid token. Please login again"
        });
      }

      // any other error
      next(err);
    }
  };
};