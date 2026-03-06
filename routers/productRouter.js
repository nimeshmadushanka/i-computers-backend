import { createProduct,deleteProduct,getAllProduct, getProductById, updateProduct } from "../controllers/productContoller.js";
import express from "express";

const productRouter = express.Router();

productRouter.get("/",getAllProduct)
productRouter.post("/",createProduct)
productRouter.delete("/:productId",deleteProduct)
productRouter.put("/:productId",updateProduct)
productRouter.get("/:productId",getProductById)
productRouter.get("/search",()=>{
    console.log("Search API")
})

export default productRouter;