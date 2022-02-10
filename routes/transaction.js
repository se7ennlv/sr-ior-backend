const express = require("express");
const router = express.Router();

const controller = require('../controllers/transaction_controller');

router.post("/", controller.createDoc);

module.exports = router;
