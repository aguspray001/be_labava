const router = require("express").Router();
const roomController = require("../controllers/room/room");
const roomRentController = require("../controllers/room/roomRent");
const accController = require("../controllers/room/acceptedStatus");


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

// accepted-status router
router.post("acc/", accController.create);
router.get("acc/", accController.read);
router.put("acc/:id", accController.update);
router.delete("acc/:id", accController.delete);

module.exports = router;