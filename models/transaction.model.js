"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // define association here
      models.TransModel.belongsTo(models.EmployeeModel, {
        as: 'employee',
        foreignKey: 'emp_id',
        sourceKey: 'emp_id'
      });
    }
  }
  Transaction.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
      emp_id: { type: DataTypes.STRING, allowNull: false },
      zone: { type: DataTypes.STRING, allowNull: false },
      reason: DataTypes.STRING,
      number_plate: DataTypes.STRING,
      record_date: { type: DataTypes.DATEONLY },
      record_time: { type: DataTypes.TIME },
      curfew_from: { type: DataTypes.TIME },
      curfew_to: { type: DataTypes.TIME },
      record_by: DataTypes.STRING,
      created_at: { type: DataTypes.DATE, allowNull: false },
      updated_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "TransModel",
      tableName: 'transactions_dev',
      timestamps: false
    }
  );
  return Transaction;
};
