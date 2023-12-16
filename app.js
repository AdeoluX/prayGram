require("dotenv").config();
const serverless = require("serverless-http");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const mongo = require('./src/config/db.config')

mongo

const userRoute = require("./src/routes/user.route");
const { errorConverter, errorHandler } = require("./src/middleware/error");
const { authRoutes, prayerRoutes } = require("./src/routes");
const ApiError = require("./src/utils/ApiError");
const httpStatus = require("http-status");


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user/v1", userRoute);
app.use("/api/v1/prayer", prayerRoutes)
app.use("/api/v1/auth", authRoutes)

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;

// app.listen(3004, () => console.log(`Listening on: 3004`));

//module.exports.handler = serverless(app);
