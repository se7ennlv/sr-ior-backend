const express = require("express");
const router = express.Router();
const passportJWT = require('../middleware/passport_jwt');

const controller = require('../controllers/report_controller');

router.get("/:fDate?/:tDate?", [passportJWT.isLogin], controller.getAllDocs);
router.get("/summary/:fieldName?/:fDate?/:tDate?", [passportJWT.isLogin], controller.getSummary);

module.exports = router;
