import repositories from "../repositories";
import httpStatus from "http-status";

const { checkInRepository } = repositories;

export default {
  async createCheckIn(req, res, next) {
    try {
      const result = await checkInRepository.createCheckIn(req);
      if (result) {
        return res.status(httpStatus.OK).json({
          message: "checkIn successfully",
          status: true,
          data: result,
        });
      } else {
        return res
          .status(httpStatus.BAD_REQUEST)
          .json({ message: "Bad request", status: false });
      }
    } catch (error) {
      next(error);
    }
  },

  async updateCheckIn(req, res, next) {
    const result = await checkInRepository.updateCheckIn(req);
    console.log("it is result", result);
  },
};
