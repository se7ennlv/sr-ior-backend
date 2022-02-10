const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const helmet = require("helmet");
const cors = require('cors')

const indexRouter = require("./routes/index");
const transRouter = require("./routes/transaction");
const empRouter = require("./routes/employee");
const adminRouter = require("./routes/admin");
const accountRouter = require("./routes/account");
const reportRouter = require("./routes/report");

const app = express();

app.use(helmet());
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1/trans", transRouter);
app.use("/api/v1/employees", empRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/accounts", accountRouter);
app.use("/api/v1/reports", reportRouter);

module.exports = app;
