const httpStatus = require("http-status");
// const { findUserByEmail, createUser } = require("../dbservices/user.table");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/tokenManagement");
const { abortIf } = require("../utils/responder");
const { userDTO } = require("../DTOs/user.dto");
const genericRepo = require("../dbservices");

const getPrayers = async () => {
  const prayers = await genericRepo.setOptions("Prayer", {
    condition: {}
  }).findAll()
  return prayers;
};

const createPrayer = async ({data, auth}) => {
  const {body} = data
  const {email, id} = auth
  // find the user
  const user = await (await genericRepo.setOptions("User", {
    condition: {_id: id}
  }).findOne()).toJSON()
  //Data to be stored
  const prayer = {
    body,
    username: `${user.firstname} ${user.lastname}`,
    user: user._id
  }
  const createPrayer = await genericRepo.setOptions('Prayer', {
    data: prayer
  }).create()
  return createPrayer
}

const getMyPrayers = async({auth}) => {
  const {id} = auth
  const prayers = await genericRepo.setOptions('Prayer', {
    condition: {user: id}
  }).findAll()
  return prayers
}

const getOnePrayer = async({id}) => {
  const prayer = await genericRepo.setOptions('Prayer', {
    condition: {_id: id}
  }).findOne();
  return prayer
}

const updatePrayerStatus = async({auth, prayer_id, status}) => {
  const { id, email } = auth;
  const updatePrayers = await genericRepo.setOptions('Prayer', {
    condition: {user: id, _id: prayer_id},
    changes: { status }
  }).update()
  return updatePrayers
}

const commentOnPrayer = async({auth, prayer_id, comment}) => {
  const { id, email } = auth
  const user = await genericRepo.setOptions('User', {
    condition: {_id: id}
  }).findOne()
  abortIf(!user, httpStatus.NOT_FOUND, 'Could not find user.')
  //find the prayer
  const prayer = await genericRepo.setOptions('Prayer', {
    condition: {_id:prayer_id}
  }).findOne()
  abortIf(!prayer, httpStatus.NOT_FOUND, 'Could not find prayer.')
  const commentData = {
    body: comment,
    username: `${user.firstname} ${user.lastname}`
  }
  await prayer.comments.push(commentData);
  const newPrayer = await prayer.save()
  return newPrayer
}

const likePrayer = async({auth, prayer_id, comment}) => {
  const { id, email } = auth
  const user = await genericRepo.setOptions('User', {
    condition: {_id: id}
  }).findOne()
  abortIf(!user, httpStatus.NOT_FOUND, 'Could not find user.')
  //find the prayer
  const prayer = await genericRepo.setOptions('Prayer', {
    condition: {_id:prayer_id}
  }).findOne()
  abortIf(!prayer, httpStatus.NOT_FOUND, 'Could not find prayer.')
  const commentData = {
    username: `${user.firstname} ${user.lastname}`
  }
  await prayer.likes.push(commentData);
  const newPrayer = await prayer.save()
  return newPrayer
}

module.exports = {
  getPrayers,
  createPrayer,
  getMyPrayers,
  getOnePrayer,
  updatePrayerStatus,
  commentOnPrayer,
  likePrayer
};
