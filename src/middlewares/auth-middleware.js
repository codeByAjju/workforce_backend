import jwt from "../services/jwt";
import employeeRepository from "../repositories/employee-repository";
import httpStatus from "http-status";
/**
 * Check user authorization
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const authValidateRequest = async (req, res, next) => {
  try {
    let error = "dgfdsgfdsgds";
    if (req.headers && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts.length === 2) {
        const scheme = parts[0];
        const token = parts[1];
        if (/^Bearer$/i.test(scheme)) {
          const decodedToken = jwt.verifyToken(token);
          if (decodedToken) {
            const user = await employeeRepository.findOne({
              id: decodedToken.id,
            });
            if (user) {
              const userToken = user.dataValues?.token;
              if (userToken) {
                req.user = user;
                req.userRole = user.dataValues?.role;
                req.userToken = userToken;
                next();
              } else {
                return res
                  .status(httpStatus.UNAUTHORIZED)
                  .json({ message: "UNAUTHORIZED ACCESS", status: false });
                next(error);
              }
            } else {
              console.log("444");
              next(error);
            }
          } else {
            return res.status(httpStatus.UNAUTHORIZED).json({
              message: "INVALID TOKEN OR or SESSION EXPIRE",
              status: false,
            });
          }
        } else {
          console.log("3333");
          next(error);
        }
      } else {
        console.log("222");
        next(error);
      }
    } else {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "TOKEN_NOT_FOUND", status: false });
    }
  } catch (error) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ message: "UNAUTHORIZED ACCESS", status: false });
    next(error);
  }
};
export default authValidateRequest;
