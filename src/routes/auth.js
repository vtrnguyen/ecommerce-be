import express from "express";
import authController from "../controllers/authController";

let router = express.Router();

router.post('/login', authController.handleUserLogin);
router.post('/regist', authController.handleUserRegist);
router.post('/logout', authController.handleUserLogin);

module.exports = router;
