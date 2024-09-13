import express from "express";
import categoryController from "../controllers/categoryController";

let router = express.Router();

router.post("/create-category", categoryController.handleCreateNewCategory);
router.get("/get-category-infor", categoryController.handleGetCategoryInfor);
router.get("/get-all-categories", categoryController.handleGetAllCategory);
router.delete("/delete-category", categoryController.handleDeleteCategory);
router.put("/update-category", categoryController.handleUpdateCategory);

module.exports = router;
