import jwt from "jsonwebtoken";
import config from "../config";
export default {
  createToken(payload) {
    return jwt.sign(payload, `${config.jwt.jwtSecret}`, {
      expiresIn: `${config.jwt.jwtExpireIn}`,
    });
  },
  verifyToken(token) {
    try {
      return jwt.verify(token, `${config.jwt.jwtSecret}`, {
        expiresIn: `${config.jwt.jwtExpireIn}`,
      });
    } catch (error) {
      // console.error("Token verificatizon failed:", error.message);
      return;
    }
  },
  decodeToken(token) {
    return jwt.decode(token, {
      complete: true,
    });
  },
};
