import express from "express";
import userController from "../controllers/userController";
import middlewareController from "../controllers/middlewareController";

let router = express.Router();

// middlewareController.verifyToken ,

router.get("/get-user-infor", userController.handleGetUserInfor);
router.get("/get-all-users", userController.handleGetAllUser);
router.delete("/delete-user", middlewareController.verifyDeleteUser, userController.handleDeleteUser);

module.exports = router;
