import httpStatus from "http-status";
import models from "../models";
import bcrypt from "bcryptjs";
import services from "../services/jwt";

const { Employee } = models;
export default {
  async createHashPassword(password) {
    try {
      const salt = await bcrypt.genSalt();
      return await bcrypt.hash(password, salt);
    } catch (error) {
      console.log(error);
    }
  },

  async signup(req) {
    try {
      const bodyData = req.body;
      const hashPassword = await this.createHashPassword(bodyData.password);
      bodyData.password = hashPassword;
      const result = await Employee.create(bodyData);
      if (result) return result;
      return false;
    } catch (error) {
      console.log("error error error error error error error error ");
      console.log(error);
      throw Error(error);
    }
  },

  async signIn(req) {
    const foundEmployee = await Employee.findOne({
      where: { email: req.body.email },
    });
    if (foundEmployee) {
      let result = await bcrypt.compare(
        req.body.password,
        foundEmployee.password
      );
      if (result) {
        let payload = {
          email: foundEmployee.dataValues?.email,
          id: foundEmployee.dataValues?.id,
        };
        let token = services.createToken(payload);
        foundEmployee.token = token;
        Employee.update(  
          { token },
          { where: { id: foundEmployee.dataValues?.id } }
        );
        return {
          token: token,
          User: foundEmployee,
        };
      } else return;
    } else return;
  },

  async findOne(where) {
    try {
      const havingWhere = where.email ? { email: where.email } : {};
      const attributes = { exclude: ["password", "verifyToken"] };
      const userData = await Employee.findOne({
        where: {
          ...where,
        },
      });
      return userData;
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  },
};
