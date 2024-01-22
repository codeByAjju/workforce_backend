import { Router } from "express";
import controller from "../controller";
import validations from "../validations";
import middlewares from "../middlewares";
import authValidateRequest from "../middlewares/auth-middleware";
import resourceAccessGuard from "../middlewares/resource-access-middleware";

const router = Router();
const { employeeController } = controller;
const { userValidator } = validations;
const { validateMiddleware } = middlewares;

router.post(
  "/signup",
  authValidateRequest,
  resourceAccessGuard(["admin"]),
  employeeController.signUp
);
router.post("/signIn", employeeController.signIn);
export default router;
