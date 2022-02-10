const express = require("express");
const router = express.Router();

const controller = require('../controllers/admin_controller');

router.get("/", controller.testConnection);

module.exports = router;
