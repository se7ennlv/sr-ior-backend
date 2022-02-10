const models = require("../models/index");

exports.getOneEmp = async (req, res, next) => {
    try {
        const empId = req.params.id;

        const result = await models.EmployeeModel.findOne({
            attributes: { exclude: ['id', 'created_at', 'updated_at', 'is_active'] },
            include: [{
                model: models.VehicleModel,
                as: 'vehicle',
                attributes: ['plate_number']
            }],
            where: { emp_id: empId }
        });

        res.status(200).json({
            status: "success",
            data: result
        });
    } catch (error) {
        next(error);

    }
};

