import express from "express";
import mongoose from "mongoose";    
//import studentRouter from "./routers/studentRouter.js";
import userRouter from "./routers/userRouer.js";
import authonticateUser from "./middleWares/athentication.js";
import productRouter from "./routers/productRouter.js";
import cors from "cors";
import Dotenv from "dotenv";

Dotenv.config()

const app = express();
const mongourl = process.env.MONGO_URI
mongoose.connect(mongourl).then(

    ()=>(
        console.log("Connected to Mongodb")
    )
)
//middlewear name express.josn
app.use(cors());

app.use(express.json() );

app.use("/api/users",userRouter)

app.use(authonticateUser)
    
//app.use("/student",studentRouter)
app.use("/api/products",productRouter)


app.listen(3000, (req,res) => {
	console.log("Server is running on port 3000");
});