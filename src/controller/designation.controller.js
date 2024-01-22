import models from "../models";
import repositories from "../repositories";
import httpStatus from "http-status";
import model from "../models";

const { designationRepository } = repositories;
const { Designation } = models;

export default {
  async createDesignation(req, res, next) {
    try {
      const foundDesignation = await Designation.findOne({
        where: { name: req.body.name },
      });

      if (foundDesignation) {
        return res
          .status(httpStatus.CONFLICT)
          .json({ message: "Designation already exists", status: false });
      }
      const result = await designationRepository.createDesignation(req);
      if (result) {
        return res.status(httpStatus.OK).json({
          message: "Designation created successfully",
          status: true,
          data: result,
        });
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

  async getDesignationList(req, res, next) {
    try {
      const result = await designationRepository.getDesignationList();
      if (result) {
        return res.status(httpStatus.OK).json({
          message: "Designation fetched successfully",
          status: true,
          data: result,
        });
      } else {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ message: "Bad request", status: false });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
