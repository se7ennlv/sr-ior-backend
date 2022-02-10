"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Vehicle extends Model {
        static associate(models) {
            // define association here
            models.VehicleModel.belongsTo(models.EmployeeModel, {
                as: 'employee',
                foreignKey: 'emp_id', //fk's employee table
                sourceKey: 'emp_id'
            });
        }
    }

    Vehicle.init(
        {
            emp_id: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
            plate_number: DataTypes.STRING,
            vehicle_type: DataTypes.STRING,
            color: DataTypes.STRING,
            job_title: DataTypes.STRING,
            brand: DataTypes.STRING,
            desc: DataTypes.STRING,
            created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
            updated_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "VehicleModel",
            tableName: 'vehicles',
            timestamps: false
        }
    );
    return Vehicle;
};
