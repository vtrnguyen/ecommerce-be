import express from "express";
import webRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectDB from "./config/connectDB";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 2712;

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

webRoutes(app);
connectDB();


app.listen(port, () => {
    console.log(`The ecommerce server is running on the port ${port}`)
})
