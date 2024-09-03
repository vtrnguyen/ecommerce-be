import express from "express";
import categoryController from "../controllers/categoryController";

let router = express.Router();

router.post("/create-category", categoryController.handleCreateNewCategory);
router.get("/get-all-categories", categoryController.handleGetAllCategory);
router.delete("/delete-category", categoryController.handleDeleteCategory);

module.exports = router;
