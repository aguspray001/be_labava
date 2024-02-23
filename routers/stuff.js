const router = require("express").Router();
const stuffController = require("../controllers/stuff/stuff");
const stuffRentController = require("../controllers/stuff/stuffRent");
const stuffCategoryController = require("../controllers/stuff/category");

// rent router
router.post("/rent/", stuffRentController.transaction);
router.get("/rents/", stuffRentController.paging);
router.put("/rent/:id", stuffRentController.update);

// accepted-status router
router.post("/acc/", stuffRentController.accTransaction);
router.post("/reject/", stuffRentController.rejectTransaction);

// room router
router.post("/", stuffController.create);
router.get("/", stuffController.paging);
router.get("/:id", stuffController.update);

// stuff category router
router.post("/category/", stuffCategoryController.create);
router.get("/categories/", stuffCategoryController.read);


module.exports = router;