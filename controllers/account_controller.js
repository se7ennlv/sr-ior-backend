const bcrypt = require('bcryptjs');
const config = require('../config/index');
const jwt = require('jsonwebtoken');

const date = require('date-and-time');
const moment = require('moment');
require('mongodb-moment')(moment);

const models = require("../models/index");

exports.createAccount = async (req, res, next) => {
  try {
    const now = new Date();
    const fullDate = date.format(now, 'YYYY-MM-DD: HH:mm:ss');

    const { role_id, username, password, is_middle_account, account_desc } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await models.AccountModel.create({
      role_id: role_id,
      username: username,
      password: hashedPassword,
      is_middle_account: is_middle_account,
      account_desc: account_desc,
      created_at: fullDate
    });

    res.status(201).json({
      status: "success",
      message: "Created"
    });
  } catch (error) {
    next(error);
  }
};

exports.authentication = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const account = await models.AccountModel.findOne({ where: { username: username } });

    if (!account) {
      return res.status(401).json({
        status: 'error',
        message: 'Employee ID is wrong or not registered.'
      });
    } else {
      const validPassword = await bcrypt.compare(password, account.password);

      if (!validPassword) {
        return res.status(401).json({
          status: 'error',
          message: 'Incorrect password'
        });
      } else {
        const token = await jwt.sign({
          id: account.id,
          role: account.role_id
        }, config.JWT_SECRET, { expiresIn: '1d' });

        const expiresIn = jwt.decode(token);

        return res.status(200).json({
          access_token: token,
          expires_in: expiresIn.exp,
          token_type: 'Bearer'
        });
      }
    }
  } catch (error) {
    next(error);
  }
}

exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const sql = `SELECT username, role_id, role_name, is_middle_account, account_desc, photo, emp_id, fname, lname, job_title, dept_name, number_plate
          FROM accounts ac
          INNER JOIN roles role ON ac.role_id = role.id
          LEFT OUTER JOIN employees emp ON ac.username = emp_id
          WHERE ac.id = ${userId}`;

    const result = await models.sequelize.query(sql, {
      type: models.sequelize.QueryTypes.SELECT,
    });

    return res.status(200).json(result[0]);
  } catch (error) {
    next(error);
  }
}

exports.updatePassword = async (req, res, next) => {
  try {
    const now = new Date();
    const fullDate = date.format(now, 'YYYY-MM-DD: HH:mm:ss');

    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    const account = await models.AccountModel.findOne({ where: { id: userId } });
    const validPassword = await bcrypt.compare(currentPassword, account.password);

    if (!validPassword) {
      return res.status(401).json({
        status: 'error',
        message: "The current password don't match!"
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      const result = await models.AccountModel.update({
        password: hashedPassword,
        updated_at: moment.utc(fullDate),
      }, {
        where: { id: userId }
      });

      if (!result) {
        const error = new Error('Error ');
        error.statusCode = 500;
        throw error;
      } else {
        return res.status(200).json({
          status: 'success',
          message: 'The password has been changed.'
        });
      }
    }
  } catch (error) {
    next(error);
  }
};


