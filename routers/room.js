const router = require("express").Router();
const roomController = require("../controllers/room/room");
const roomRentController = require("../controllers/room/roomRent");

// room router
router.post("/", roomController.create);
router.get("/", roomController.read);
router.put("/:id", roomController.update);
router.delete("/:id", roomController.delete);

// rent router
router.post("/rent", roomRentController.rent);
router.get("/rents/", roomRentController.paging);
router.post("/acc/:id", roomRentController.acc);
router.post("/reject/:id", roomRentController.reject);
router.post("/rollback/:id", roomRentController.rollback);

module.exports = router;