const router = require("express").Router();
const userController = require("../controllers/user/user");
const roleController = require("../controllers/user/role");


router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", userController.listUser);
router.put("/update-role/:id", userController.updateUserRole);


router.post("/role", roleController.create);
router.put("/role/:id", roleController.update);
router.delete("/role/:id", roleController.delete);


module.exports = router;