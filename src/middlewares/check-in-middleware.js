import httpStatus from "http-status";
import models from "../models";
const { CheckInTime } = models;
const checkInStatus = async (req, res, next) => {
  const {
    body: { date },
    user: {
      dataValues: { id },
    },
  } = req;
  const existingCheckIn = await CheckInTime.findOne({
    where: {
      date,
      employeeId: id,
    },
  });
  if (existingCheckIn) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "already checked-in ", status: false });
  } else {
    next();
  }
};
export default checkInStatus;
