const date = require('date-and-time');
const moment = require('moment');
require('mongodb-moment')(moment);

const models = require("../models/index");

exports.createDoc = async (req, res, next) => {
  try {
    const now = new Date();
    const shortDate = date.format(now, 'YYYY-MM-DD');
    const shortTime = date.format(now, 'HH:mm:ss');
    const fullDate = date.format(now, 'YYYY-MM-DD: HH:mm:ss');

    const { emp_id, reason, zone } = req.body;

    const result = await models.TransModel.create({
      emp_id: emp_id,
      zone: zone,
      reason: reason,
      number_plate: 'N/A',
      record_date: shortDate,
      record_time: shortTime,
      created_at: moment.utc(fullDate),
    });

    res.status(201).json({
      status: "success",
      message: "Submitted",
      data: result.id
    });
  } catch (error) {
    next(error);
  }
};
