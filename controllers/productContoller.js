import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct (req,res){

    if (!isAdmin(req)){
        res.status(403).json({
            message : "Access Denied.admins only"
        })
        return
    }


    try{
         const  existingProduct = await Product.findOne(
            {
                productId : req.body.productId,
            })
            if(existingProduct != null ){
                res.status(400).json({
                    message: "Product  Already exists" 
                })
                return
            }

            const newproduct = new Product({
                productId : req.body.productId,
                name : req.body.name,
                altNames : req.body.altNames,
                price : req.body.price,
                labelledProce : req.body.labelledProce,
                description : req.body.description,
                images  : req.body.images,
                brand : req.body.brand,
                model : req.body.model,
                category : req.body.category,
                stock : req.body.stock
            })

            await newproduct.save()
            res.status(201).json({
                message :"create Sucessfully"
            })

    }catch(error){
        res.status(500).json({
            message : "Error Creating Product"
        })

    }

}

export async function getAllProduct(req,res) {
    
    try{

        if(isAdmin(req)){


        const products = await Product.find()

        res.json(products)
    }
        else{

            const products = await Product.find({isAvailble : true})
            res.json(products)
        }

    }catch(error){
        res.status(500).json({
            message : "Error Fetching Products",
        })

    }
}

export async function deleteProduct(req,res) {
    if(!isAdmin(req)){
        res.status(403).json({
            message :"Access Denied.Admin Only Can Delete Product"
        })
        return
    }
    try{
        await Product.deleteOne({
            productId : req.params.productId
        })
        res.json({
            message : "Product Is deleted"
        })
    }catch(error){
        res.json({
            message : "product Is Not Deleted Succesfully"
        })

    }
}

export async function updateProduct(req,res) 
{
    if(!isAdmin(req)){
        res.status(403).json({
            message : "Admin only Can Update the Product"
        })
        return
    }  
    
    try{
        await Product.updateOne({
            productId : req.params.productId
        },{
                 productId : req.body.productId,
                name : req.body.name,
                altNames : req.body.altNames,
                price : req.body.price,
                labelledProce : req.body.labelledProce,
                description : req.body.description,
                images  : req.body.images,
                brand : req.body.brand,
                model : req.body.model,
                category : req.body.category,
                isAvailble : req.body.isAvailble,
                stock : req.body.stock
        })

        res.json({
            message : "Prodcut Update Scussfully"
        })

    }catch(error){
        res.status(500).json({
            message : "Error Updating Product"
        })

    }
}

export async function getProductById(req,res) {

try{
    const product = await Product.findOne({
        productId : req.params.productId
    })
    if (product == null)
    {
        res.status(500).json({
            message : "Prodcut Not Found"
        })
    }else{
        if(product.isAvailble){
            res.json(product)
        }else{
            if(isAdmin(req)){
                res.json(product)
            }else{
                res.status(403).json({
                    message : "Access Denied.Admin Can View Product"
                })
            }
        }
    }

}catch(error){
    res.status(500).json({
            message : "Error Finding Product"
        })

}}
