import models from "../models";
import services from "../services/jwt";
import config from "../config";
import repositories from "../repositories";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import model from "../models";
import bcrypt from "bcryptjs";

const { employeeRepository } = repositories;
const { Employee } = models;

export default {
  async signUp(req, res, next) {
    try {
      const foundEmployee = await Employee.findOne({
        where: { email: req.body.email },
      });

      if (foundEmployee) {
        return res
          .status(httpStatus.CONFLICT)
          .json({ message: "Email already exists", status: false });
      }
      const result = await employeeRepository.signup(req);
      if (result) {
        return res
          .status(httpStatus.OK)
          .json({ message: "Submitted", status: true, data: result });
      } else {
        console.log(error);
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ message: "Bad request", status: false });
      }
    } catch (error) {
      next(error);
    }
  },

  async signIn(req, res, next) {
    try {
      const result = await employeeRepository.signIn(req);
      if (result) {
        return res
          .status(httpStatus.OK)
          .json({ message: "Submitted", status: true, data: result });
      } else {
        return res
          .status(httpStatus.UNAUTHORIZED)
          .json({ message: "Unauthorized User", status: false });
      }
    } catch (error) {
      console.log("this is error", error);
      return res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error", status: false });
    }
  },
};
