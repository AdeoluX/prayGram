const catchAsync = require("../utils/catchAsync");
const {prayerService} = require('../services')
const { successResponse, abortIf } = require("../utils/responder");
const httpStatus = require("http-status");

const getPrayers = catchAsync(async (req, res, next) => {
  const create = await prayerService.getPrayers();
  return successResponse(res, create);
});

const createPrayer = catchAsync(async (req, res, next) => {
  const data = req.body
  const create = await prayerService.createPrayer({data, auth: res.locals.auth});
  return successResponse(res, create);
});

const getMyPrayers = catchAsync(async (req, res, next) => {
  const create = await prayerService.getMyPrayers({auth: res.locals.auth});
  return successResponse(res, create);
});

const getOnePrayer = catchAsync(async (req, res, next) => {
  const create = await prayerService.getOnePrayer({id: req.params.id});
  return successResponse(res, create);
});

const updatePrayers = catchAsync(async (req, res, next) => {
  const create = await prayerService.updatePrayerStatus({auth: res.locals.auth, prayer_id:req.params.id, status: req.body.status});
  return successResponse(res, create);
});

const commentOnPrayer = catchAsync(async (req, res, next) => {
  const create = await prayerService.commentOnPrayer({auth: res.locals.auth, prayer_id:req.params.id, comment: req.body.comment});
  return successResponse(res, create);
});

const likePrayer = catchAsync(async (req, res, next) => {
  const create = await prayerService.likePrayer({auth: res.locals.auth, prayer_id:req.params.id, comment: req.body.comment});
  return successResponse(res, create);
});
 
module.exports = {
  getPrayers,
  createPrayer,
  getMyPrayers,
  getOnePrayer,
  updatePrayers,
  commentOnPrayer,
  likePrayer
};
