import { Router } from "express";
import controller from "../controller";
import validations from "../validations";
import middlewares from "../middlewares";

const router = Router();
const { designationController } = controller;
const { authValidateRequest, resourceAccessMiddleware } = middlewares;

router.post(
  "/admin/create-designation",
  authValidateRequest,
  resourceAccessMiddleware(["admin"]),
  designationController.createDesignation
);
router.get(
  "/designation-list",
  authValidateRequest,
  resourceAccessMiddleware(["admin"]),
  designationController.getDesignationList
);
export default router;
