import jwt from 'jsonwebtoken';
import config from '../src/config';

export default {
  createToken(payload) {
    return jwt.sign(payload, config.jwt.jwtSecret, {
      expiresIn: config.jwt.jwtExpireIn,
    });
  },
  verifyToken(token) {
    return jwt.verify(token, config.jwt.jwtSecret, {
      expiresIn: config.jwt.jwtExpireIn,
    });
  },
  decodeToken(token) {
    return jwt.decode(token, {
      complete: true,
    });
  },
};
