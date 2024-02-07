const router = require("express").Router();
const roomController = require("../controllers/room/room");
const roomRentController = require("../controllers/room/roomRent");

// rent router
router.post("/rent", roomRentController.rentRoom);
router.get("/rent/:id", roomRentController.accRentRoom);
router.put("/rent/:id", roomRentController.rejectRentRoom);
router.delete("/rent/:id", roomRentController.rollBackRentRoom);

// room router
router.post("/", roomController.create);
router.get("/", roomController.read);
router.put("/:id", roomController.update);
router.delete("/:id", roomController.delete);

module.exports = router;