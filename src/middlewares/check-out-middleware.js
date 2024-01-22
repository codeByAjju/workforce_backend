import httpStatus from "http-status";
import models from "../models";
import jwt from "jsonwebtoken";
import utility from "../utility/index";
const { CheckInTime } = models;
const checkOutStatus = async (req, res, next) => {
  const {
    user: {
      dataValues: { id },
    },
  } = req;

  var dateTime = new Date().toUTCString();

  const result = await utility.getCurrentDate(dateTime, "YYYY-MM-DD HH:mm:ss");
  const date = result.slice(0, 10);
  const time = result.slice(11);
  const notExistingCheckOut = await CheckInTime.findOne({
    where: {
      date,
      employeeId: id,
      checkoutTime: "",
    },
  });
  if (notExistingCheckOut) {
    next();
    // console.log("user come for checkout and he doesn't checkout ");
  } else {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "already check-out ", status: false });
  }
};
export default checkOutStatus;
