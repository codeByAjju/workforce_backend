import { Op } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  const CheckInTime = sequelize.define("CheckInTime", {
    checkinTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    checkoutTime: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // unique:true
    },
  });

  CheckInTime.associate = (models) => {
    CheckInTime.belongsTo(models.Employee, {
      foreignKey: "employeeId",
      onDelete: "cascade",
    });
  };
  return CheckInTime;
};
