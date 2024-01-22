import validateMiddleware from "./validate-middleware";
import resourceAccessMiddleware from "./resource-access-middleware";
import authValidateRequest from "./auth-middleware";
import checkInStatus from "./check-in-middleware";
import checkOutStatus from "./check-out-middleware";
export default {
  validateMiddleware,
  resourceAccessMiddleware,
  authValidateRequest,
  checkInStatus,
  checkOutStatus,
};
