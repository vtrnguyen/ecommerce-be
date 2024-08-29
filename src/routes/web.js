import express from "express";
import userRoutes from "./user";
import authRoutes from "./auth";

let router = express.Router();

let webRoutes = (app) => {
    // auth
    app.use("/api/v1/auth", authRoutes);

    // user
    router.use("/api/v1/user", userRoutes);
    
    return app.use("/", router);
}

module.exports = webRoutes;
