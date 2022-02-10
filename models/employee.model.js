"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      // define association here
      models.EmployeeModel.hasMany(models.TransModel, {
        as: 'transaction',
        foreignKey: 'emp_id', //fk's transactions table
        sourceKey: 'emp_id'
      });

      models.EmployeeModel.hasMany(models.VehicleModel, {
        as: 'vehicle',
        foreignKey: 'emp_id', //fk's vehicles table
        sourceKey: 'emp_id'
      });
    }
  }

  Employee.init(
    {
      emp_id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
      photo: DataTypes.STRING,
      fname: { type: DataTypes.STRING, allowNull: false },
      lname: { type: DataTypes.STRING, allowNull: false },
      job_title: { type: DataTypes.STRING, allowNull: false },
      dept_code: DataTypes.STRING,
      dept_name: { type: DataTypes.STRING, allowNull: false },
      number_plate: { type: DataTypes.STRING, allowNull: false },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: DataTypes.DATE,
      is_active: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
      sequelize,
      modelName: "EmployeeModel",
      tableName: 'employees',
      timestamps: false
    }
  );
  return Employee;
};
