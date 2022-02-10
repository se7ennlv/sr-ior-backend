"use strict";

const bcrypt = require('bcryptjs');
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class AccountSchema extends Model {
    static associate(models) {
      // define association here
    }
  }

  AccountSchema.init({
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true },
    role_id: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    password: { type: DataTypes.STRING, allowNull: false },
    is_middle_account: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0 },
    account_desc: DataTypes.STRING,
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: DataTypes.DATE,
    is_active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 1 },
  }, {
    sequelize,
    modelName: "AccountModel",
    tableName: 'accounts',
    timestamps: false,
  });

  return AccountSchema;
};
