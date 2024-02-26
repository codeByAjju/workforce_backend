import { Op } from "sequelize";
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("Employee", {
    firstname: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "deleted"),
      defaultValue: "active",
    },
    dateOfBirth: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    employeeNumber: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING(70),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      default: "EMPLOYEE",
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
      default: null
    },
    designationId: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
    },
  });

  Employee.associate = (models) => {
    Employee.belongsTo(models.Designation,{
      foreignKey: "designationId",
    });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
    Employee.hasOne(models.CheckInTime, {
      foreignKey: "employeeId",
      targetKey: "id",
    });
  };

  return Employee;
};
