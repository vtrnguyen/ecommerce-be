import express from "express";
import userController from "../controllers/userController";
import middlewareController from "../controllers/middlewareController";

let router = express.Router();

// middlewareController.verifyToken ,

router.get("/get-user-infor", middlewareController.verifyToken, userController.handleGetUserInfor); // all
router.get("/get-all-users", middlewareController.verifyToken, userController.handleGetAllUser); // admin
router.post("/create-new-user", userController.handleCreateUser); // admin
router.put("/update-user", userController.handleUpdateUser); // admin
router.delete("/delete-user", userController.handleDeleteUser); // admin

module.exports = router;
