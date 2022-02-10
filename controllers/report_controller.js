const { Op } = require('sequelize');
const models = require("../models/index");
const moment = require('moment');
require('mongodb-moment')(moment);

exports.getAllDocs = async (req, res, next) => {
    try {
        const startDate = moment.utc(req.params.fDate);
        const endDate = moment.utc(req.params.tDate);

        const result = await models.TransModel.findAll({
            attributes: { exclude: ['updated_at'] },
            include: [
                {
                    model: models.EmployeeModel,
                    as: 'employee',
                    attributes: { exclude: ['id', 'emp_id', 'created_at', 'updated_at', 'is_active'] }
                }
            ],
            where: { created_at: { [Op.between]: [startDate, endDate] } },
            //raw: true,
            order: [["created_at", "desc"]],
        });

        res.status(200).json({
            status: "success",
            data: result
        });
    } catch (error) {
        next(error);
    }
};

exports.getSummary = async (req, res, next) => {
    try {
        const startDate = req.params.fDate;
        const endDate = req.params.tDate;
        const fieldName = req.params.fieldName;

        const sql = `SELECT ${fieldName} AS name, COUNT(*) AS value FROM transactions trans
            LEFT OUTER JOIN employees emp ON trans.emp_id = emp.emp_id
            WHERE trans.created_at BETWEEN '${startDate}' AND '${endDate}'
            GROUP BY ${fieldName} ORDER BY ${fieldName}`;

        const result = await models.sequelize.query(sql, {
            type: models.sequelize.QueryTypes.SELECT
        });

        res.status(200).json({
            status: "success",
            data: result
        });
    } catch (error) {
        next(error);
    }
}



