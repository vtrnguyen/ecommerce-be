import express from "express";
import webRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectDB from "./config/connectDB";
import cors from "cors";
require('dotenv').config()

const app = express();
const port = process.env.PORT || 2712;

app.use(cors({
    origin: 'http://localhost:3000', // Chỉ định domain của client
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Các phương thức HTTP mà bạn muốn cho phép
    allowedHeaders: ['Content-Type', 'Authorization'], // Các header cho phép
    credentials: true // Cho phép gửi kèm chứng thực
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

webRoutes(app);
connectDB();


app.listen(port, () => {
    console.log(`The ecommerce server is running on the port ${port}`)
})
