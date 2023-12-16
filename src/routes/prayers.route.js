const express = require("express");
const {
  prayerController
} = require("../controller");
const { verify } = require("../middleware/verifyToken");
const router = express.Router();

router.get("/get-prayers", verify, prayerController.getPrayers);

router.post("/post-request", verify, prayerController.createPrayer);

router.get("/get-my-prayers", verify, prayerController.getMyPrayers);

router.get("/get-prayer/:id", verify, prayerController.getOnePrayer)

router.patch("/update-prayer/:id", verify, prayerController.updatePrayers)

router.post("/comment/:id", verify, prayerController.commentOnPrayer)

router.post("/like/:id", verify, prayerController.likePrayer)

module.exports = router;