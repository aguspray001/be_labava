const router = require("express").Router();
const userController = require("../controllers/user/user");
const roleController = require("../controllers/user/role");
const prodiController = require("../controllers/user/prodi");
const statusController = require("../controllers/user/status");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", userController.listUser);
router.put("/update-role/:id", userController.updateUserRole);

// role router
router.post("/role", roleController.create);
router.get("/role", roleController.read);
router.put("/role/:id", roleController.update);
router.delete("/role/:id", roleController.delete);

// prodi router
router.post("/prodi", prodiController.create);
router.get("/prodi", prodiController.read);
router.put("/prodi/:id", prodiController.update);
router.delete("/prodi/:id", prodiController.delete);

// status router
router.post("/status", statusController.create);
router.get("/status", statusController.read);
router.put("/status/:id", statusController.update);
router.delete("/status/:id", statusController.delete);

module.exports = router;