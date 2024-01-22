import httpStatus from "http-status";
import models from "../models";

const { Designation } = models;
export default {
  async createDesignation(req) {
    try {
      const bodyData = req.body;
      const result = await Designation.create(bodyData);
      if (result) return result;
      return false;
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  },
  async getDesignationList() {
    try {
      const result = await Designation.findAll();
      if (result) return result;
      return false;
    } catch (error) {
      throw Error(error);
    }
  },
};
