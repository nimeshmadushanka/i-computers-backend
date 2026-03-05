import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

 
 
    //user Creation theory
 export  async function createUser(req,res){

    //const data = req.body

    try{

        const passwordHash = bcrypt.hashSync(req.body.password,10)

    const newUser   = new User({
        email : req.body.email,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        password : passwordHash

    } )
 
    await newUser.save();

        res.json({
            message : "User Create Successfully.."
        })
    
    }catch(error){
        res.json({
           Message : "User Creation Fail",
           }   )
        
    }
    
    }
   //user Login Theory
export async function loginUser(req,res){
    //req.email
    //req.psw

    try{   
        const user = await User.findOne({
            email : req.body.email,
        })
            if (user == null){
            res.status(404).json({
                message : "User Not Found"

            })
            }else{
                const ispasswordCorrect = bcrypt.compareSync(req.body.password,user.password)
                if(ispasswordCorrect){
                    
                    const payload = {
                        email : user.email,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        isAdmin : user.isAdmin,
                        isBlocked : user.isBlocked,
                        isEmailVerified : user.isEmailVerified,
                        Image : user.Image

                    }
                        const token = jwt.sign(payload,"i-computers10Batch",
                            {
                                expiresIn : "30m"
                            }
                        )
                         res.json({
                            token : token

                         }) 


                }else
                    {
                        res.status(401).json({
                            message : "Invalid Credentials"
                        })
                    }
            }


    }catch(error){
        res.status(500).json({

            message:"Error found"
        })
    }
}

export  function isAdmin(req){
   
    if(req.user == null){
        return false
    }else{
        if (req.user.isAdmin){
            return true
        }else{
            return false
        }
    }
}