import express from "express";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/api/get-all-user', userController.handleGetAllUser);

    return app.use("/", router);
}

module.exports = initWebRoutes;
