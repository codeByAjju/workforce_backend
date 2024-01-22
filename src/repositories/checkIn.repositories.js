import models from "../models";
import utility from "../utility";
const { CheckInTime } = models;
export default {
  async createCheckIn(req) {
    try {
      const { user, body } = req;
      const bodyData = body;
      bodyData.employeeId = user?.dataValues?.id ?? null;
      const result = await CheckInTime.create(bodyData);
      return result;
    } catch (error) {
      console.log("lasjlksdfldsjfjl")
      console.log(error);
      throw Error(error);
    }
  },
  async updateCheckIn(req) {
    try {
      const employee = req.user.dataValues;
      const foundEmployee = await CheckInTime.findOne({
        where: { employeeId: employee?.id },
      });

      if (foundEmployee) {
        const dateTime = new Date().toUTCString();
        const result = await utility.getCurrentDate(
          dateTime,
          "YYYY-MM-DD HH:mm:ss"
        );
        const time = result.slice(11);
        foundEmployee.checkoutTime = time;
        await foundEmployee.save();

        return {
          User: foundEmployee,
        };
      } else {
        console.log("Employee not found");
      }
    } catch (error) {
      console.error("Error updating CheckInTime:", error);
      throw new Error("Failed to update CheckInTime");
    }
  },
  async getCheckInEmployeeList() {
    try {
      const result = await designation.findAll();
      if (result) return result;
      return false;
    } catch (error) {
      throw Error(error);
    }
  },
};
