import { Op } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  const Designation = sequelize.define("Designation", {
    name: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
  });
  Designation.associate = (models) => {
    Designation.hasMany(models.Employee,{
      foreignKey:'designationId'
    }) 
}
  return Designation;
};
