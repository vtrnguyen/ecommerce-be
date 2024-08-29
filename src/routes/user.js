import express from "express";
import userController from "../controllers/userController";

let router = express.Router();

router.get("/get-all-users", userController.handleGetAllUser);

module.exports = router;
