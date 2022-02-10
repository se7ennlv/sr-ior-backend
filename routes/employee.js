const express = require("express");
const router = express.Router();

const controller = require('../controllers/employee_controller');

router.get("/:id", controller.getOneEmp);

module.exports = router;
