const router = require("express").Router();
const userController = require("../controllers/user/user");
const roleController = require("../controllers/user/role");
const roomRentController = require("../controllers/room/roomRent");

// rent router
router.post("/rent", roomRentController.rentRoom);
router.get("/rent/:id", roomRentController.accRentRoom);
router.put("/rent/:id", roomRentController.rejectRentRoom);
router.delete("/rent/:id", roomRentController.rollBackRentRoom);

module.exports = router;