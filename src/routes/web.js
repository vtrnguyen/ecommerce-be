import express from "express";
import userRoutes from "./user";
import authRoutes from "./auth";
import categoryRoutes from "./category";

let router = express.Router();

let webRoutes = (app) => {
    // auth
    app.use("/api/v1/auth", authRoutes);

    // user
    app.use("/api/v1/user", userRoutes);

    // category
    app.use("/api/v1/category", categoryRoutes);
    
    return app.use("/", router);
}

module.exports = webRoutes;
