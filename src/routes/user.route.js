const express = require("express");
const router = express.Router();

const {userController} = require('../controller')

router.post("/users", userController.getUsers);

module.exports = router;