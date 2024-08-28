import express from "express";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import connectDB from "./config/connectDB";
require('dotenv').config()

const app = express();
const port = process.env.PORT || 2712;


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

initWebRoutes(app);
connectDB();


app.listen(port, () => {
    console.log(`The ecommerce server is running on the port ${port}`)
})
