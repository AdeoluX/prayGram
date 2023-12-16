const catchAsync = require("../utils/catchAsync");
const {userService} = require('../services')
const { successResponse, abortIf } = require("../utils/responder");
const httpStatus = require("http-status");

const getUsers = catchAsync(async (req, res, next) => {
  const create = await userService.getUsers();
  return successResponse(res, create);
});

module.exports = {
  getUsers
};
