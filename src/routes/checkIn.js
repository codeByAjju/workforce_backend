import controller from "../controller";
import middlewares from "../middlewares";
import { Router } from "express";
const router = Router();
const { checkInController } = controller;
const { checkInStatus, authValidateRequest, checkOutStatus } = middlewares;

router.post(
  "/check-in",
  authValidateRequest,
  checkInStatus,
  checkInController.createCheckIn
);
router.put(
  "/check-out",
  authValidateRequest,
  checkOutStatus,
  checkInController.updateCheckIn
);
export default router;
