import express from "express";
import mongoose from "mongoose";    
import studentRouter from "./routers/studentRouter.js";
import userRouter from "./routers/userRouer.js";
import authonticateUser from "./middleWares/athentication.js";
import productRouter from "./routers/productRouter.js";

const app = express();
const mongourl = "mongodb+srv://admin:1234@cluster0.bqlq6c1.mongodb.net/icomputer?appName=Cluster0"
 
mongoose.connect(mongourl).then(

    ()=>(
        console.log("Connected to Mongodb")
    )
)
//middlewear name express.josn

app.use(express.json() );

app.use("/users",userRouter)

app.use(authonticateUser)
    
//app.use("/student",studentRouter)
app.use("/Product",productRouter)


app.listen(3000, (req,res) => {
	console.log("Server is running on port 3000");
});