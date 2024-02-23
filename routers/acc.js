const router = require("express").Router();
const accController = require("../controllers/utils/acceptedStatus");

// accepted-status router
router.post("/", accController.create);
router.get("/", accController.read);
router.put("/:id", accController.update);
router.delete("/:id", accController.delete);

module.exports = router;