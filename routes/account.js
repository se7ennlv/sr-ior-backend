const express = require("express");
const router = express.Router();
const passportJWT = require('../middleware/passport_jwt');

const controller = require('../controllers/account_controller');

router.post("/", controller.createAccount);
router.post("/auth", controller.authentication);
router.get("/profile", [passportJWT.isLogin], controller.getProfile);
router.put("/password-manage", [passportJWT.isLogin], controller.updatePassword);


module.exports = router;
