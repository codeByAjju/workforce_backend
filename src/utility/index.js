import moment from "moment";

export default {
  isCheckedIn(date) {
    console.log("it is date ", date);
  },

  getCurrentDate(date, format) {
    try {
      if (date) {
        return moment(date).format(format ?? "YYYY-MM-DD");
      }
      return moment().format(format ?? "YYYY-MM-DD");
    } catch (error) {
      throw new Error(error);
    }
  },
};
