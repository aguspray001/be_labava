const router = require("express").Router();
const userController = require("../controllers/user/user");
const roleController = require("../controllers/user/role");
const prodiController = require("../controllers/user/prodi");
const statusController = require("../controllers/user/status");
const otpController = require("../controllers/user/otp");
const { jwtAuthMiddleware } = require("../middlewares/auth");

// user router
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", [jwtAuthMiddleware], userController.listUser);
router.put("/update-role/:id", [jwtAuthMiddleware], userController.updateUserRole);
router.put("/verification/:id", [jwtAuthMiddleware], userController.verifiedStatus);

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

// otp router
router.post("/otp", otpController.create);
router.put("/otp/:id", otpController.update);
router.delete("/otp/:id", otpController.delete);

module.exports = router;